import {PageOptionsInterface} from "./page-options.interface";

export class PaginationMeta {
    readonly skip: number;
    readonly take: number;
    readonly page: number;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;

    constructor(pageOptions: PageOptionsInterface, itemCount: number) {
        this.skip = pageOptions.skip;
        this.take = pageOptions.take;
        this.page = Math.ceil(this.skip / this.take)
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}
