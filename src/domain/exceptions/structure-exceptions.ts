export class StructureException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class MethodIsNotAvailableException extends StructureException {

    constructor(message?: string) {
        super(message ?? 'method is not available');
    }
}