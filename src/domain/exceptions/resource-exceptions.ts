export class ResourceException extends Error {
    resource: string
    details: any
    msg: string

    constructor(message: string, resource: string, details?: any) {
        super(message);
        this.resource = resource
        this.details = details
        this.msg = message
    }
}

export class ResourceNotFoundException extends ResourceException {
    name = 'ResourceNotFoundException'

    constructor(resource: string, details: any, message?: string) {
        super(message ?? 'resource not found', resource, details);
    }
}

export class ResourcePreconditionFailed extends ResourceException {
    name = 'ResourcePreconditionFailed'

    constructor(resource: string, details: any, message?: string) {
        super(message ?? 'precondition failed', resource, details);
    }
}

export class ExternalResourceException extends ResourceException {
    name = 'ExternalResourceException'

    constructor(resource: string, details: any, message?: string) {
        super(message ?? 'external resource exception', resource, details);
    }
}

export class ResourceConflictException extends ResourceException {
    name = 'ResourceConflictException'

    constructor(resource: string, details: any, message?: string) {
        super(message ?? 'resource conflict', resource, details);
    }
}