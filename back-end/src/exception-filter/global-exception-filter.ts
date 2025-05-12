import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
    constructor(private readonly logger: Logger) { }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const isHttpException = exception instanceof HttpException;
        const status = isHttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = isHttpException
            ? exception.getResponse()
            : (exception as any)?.message || 'Unexpected error';

        const stack =
            typeof exception === 'object' && exception !== null
                ? (exception as any).stack
                : undefined;

        this.logger.error({
            msg: 'Unhandled Exception',
            method: request.method,
            url: request.url,
            statusCode: status,
            message,
            stack,
        });

        response.status(status).send({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
        });
    }
}
