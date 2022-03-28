export class ApiError extends Error {
    public statusCode: number;

    public constructor(message: string = 'OK', statusCode: number = 200, stack?: string) {
        super();
        this.name = 'ApiError';
        this.message = message;
        this.stack = stack;
        this.statusCode = statusCode;
    }
}