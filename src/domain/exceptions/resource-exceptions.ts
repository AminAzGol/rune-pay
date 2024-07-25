export class ResourceException extends Error {
    resource: string
    details: any

    constructor(message: string, resource: string, details?: any) {
        super(message);
        this.resource = resource
        this.details = details
    }
}

export class ResourceNotFoundException extends ResourceException {
    name = 'ResourceNotFoundException'

    constructor(resource: string, details: any, message?: string) {
        super(message ?? 'resource not found', resource, details);
    }
}