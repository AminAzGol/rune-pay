import type {IException, IFormatExceptionMessage} from '../../../domain/exceptions/exceptions.interface';
import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    PayloadTooLargeException,
    ServiceUnavailableException,
    UnauthorizedException,
} from '@nestjs/common';
import {ResourceException, ResourceNotFoundException} from "../../../domain/exceptions/resource-exceptions";

@Injectable()
export class ExceptionsService implements IException {
    badRequestException(data: IFormatExceptionMessage): void {
        if (!data.errorCode) data.errorCode = 40001;
        if (!data.message) data.message = "some parameters are invalid."
        throw new BadRequestException(data);
    }

    internalServerErrorException(data?: IFormatExceptionMessage): void {
        if (!data.errorCode) data.errorCode = 50001
        if (!data.message) data.message = "internal server error."
        throw new InternalServerErrorException(data);
    }

    forbiddenException(data?: IFormatExceptionMessage): void {
        if (!data.errorCode) data.errorCode = 403
        if (!data.message) data.message = "access to data for this user is forbidden."
        throw new ForbiddenException(data);
    }

    unauthorizedException(data?: IFormatExceptionMessage): void {
        if (!data.errorCode) data.errorCode = 40101
        if (!data.message) data.message = "you are not authorized to this resource."
        throw new UnauthorizedException(data);
    }

    conflictException(data?: IFormatExceptionMessage): void {
        if (!data.errorCode) data.errorCode = 40901
        if (!data.message) data.message = "resource already exists."
        throw new ConflictException(data);
    }

    notFoundException(data?: IFormatExceptionMessage): void {
        if (!data.errorCode) data.errorCode = 40401;
        if (!data.message) data.message = `no ${data.resource} found with given information.`
        throw new NotFoundException(data);
    }

    payloadTooLargeException(data?: IFormatExceptionMessage): void {
        if (!data.errorCode) data.errorCode = 41301;
        if (!data.message) data.message = "the size or number of files exceeds the limit."
        throw new PayloadTooLargeException(data);
    }

    serviceException(data?: IFormatExceptionMessage): void {
        if (!data.errorCode) data.errorCode = 50301
        if (!data.message) data.message = "the service unavailable."
        throw new ServiceUnavailableException(data);
    }

    resourceErrorToControllerError(e: ResourceException) {
        if (e instanceof ResourceNotFoundException) {
            this.notFoundException({message: e.message, resource: e.resource, details: e.details})
        }
    }
}
