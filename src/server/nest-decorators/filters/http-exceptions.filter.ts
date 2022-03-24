import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    ForbiddenException,
    HttpException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

type Nullable<T> = T | null;

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): Nullable<Response> {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let statusCode = 500;
        let message = ``;

        if (exception instanceof NotFoundException) {
            statusCode = 404;
            message = exception.message || 'Not Found';
        }

        if (exception instanceof ForbiddenException) {
            statusCode = 403;
            message = exception.message || 'Forbidden';
        }

        if (exception instanceof BadRequestException) {
            statusCode = 400;
            message = exception.message || 'Bad Request';
        }

        if (exception instanceof UnauthorizedException) {
            statusCode = 401;
            message = exception.message || 'Unauthorized';
        }

        return response.status(statusCode).json({
            statusCode,
            message,
        });
    }
}
