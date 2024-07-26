import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import {ResourceNotFoundException} from "../../../domain/exceptions/resource-exceptions";

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    constructor() {
    }

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request: any = ctx.getRequest();
        let status = 500

        switch (exception.constructor) {
            case ResourceNotFoundException:
                status = 404
                break;
            default:
                status = 500
        }

        const responseData = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: status >= 500 ? undefined : exception
        }

        response.status(status).json(responseData);

    }

}