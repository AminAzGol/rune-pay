export interface IFormatExceptionMessage {
    resource?: string;
    message?: string;
    details?: any;
    errorCode?: number;
}

export interface IException {
    badRequestException(data: IFormatExceptionMessage): void;

    internalServerErrorException(data?: IFormatExceptionMessage): void;

    forbiddenException(data?: IFormatExceptionMessage): void;

    unauthorizedException(data?: IFormatExceptionMessage): void;

    conflictException(data?: IFormatExceptionMessage): void;

    notFoundException(data?: IFormatExceptionMessage): void;

    payloadTooLargeException(data?: IFormatExceptionMessage): void;

    serviceException(data?: IFormatExceptionMessage): void;
}
