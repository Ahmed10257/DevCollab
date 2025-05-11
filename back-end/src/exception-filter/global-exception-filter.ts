import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Logger } from "nestjs-pino";

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
    constructor(private readonly logger: Logger) { }
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const errorDetails = exception instanceof HttpException ? exception.getResponse() : "Not an HttpException";
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        // Log the error
        this.logger.error(`${request.method} ${request.originalUrl} ${status} error: ${exception}`);

        response.status(status).send({
            statusCode: status,
            message: errorDetails,
            timestamp: new Date().toISOString(),
        }
        );
    }
}