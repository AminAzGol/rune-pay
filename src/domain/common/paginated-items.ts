import {PaginationMeta} from "./pagination-meta";

export class PaginatedItems<T> {
    readonly data: T[];
    readonly meta: PaginationMeta;

    constructor(data: T[], meta: PaginationMeta) {
        this.data = data;
        this.meta = meta;
    }
}
