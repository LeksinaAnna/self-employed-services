import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const HeaderContentType = createParamDecorator((data: keyof any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return (request.headers && (request.headers['content-type'] || request.headers['Content-Type'])) || undefined;
});
