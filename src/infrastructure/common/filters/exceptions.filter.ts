import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import {
    ExternalResourceException,
    ResourceNotFoundException,
    ResourcePreconditionFailed
} from "../../../domain/exceptions/resource-exceptions";

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logger: { error: Function }) {
    }

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request: any = ctx.getRequest();
        let status: number;
        if (isNestHttpException(exception)) {
            status = exception.getStatus()
        } else {
            switch (exception.constructor) {
                case ResourceNotFoundException:
                    status = 404
                    break;
                case BadRequestException:
                    status = 400
                    break;
                case ResourcePreconditionFailed:
                    status = 412
                    break;
                case ExternalResourceException:
                    status = 503
                    break;
                default:
                    status = 500
            }
        }

        const responseData = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: status >= 500 ? undefined : exception
        }

        if (status >= 500) this.logger.error(exception)
        response.status(status).json(responseData);

    }

}

function isNestHttpException(exception: any): exception is HttpException {
    return exception.status !== undefined
}