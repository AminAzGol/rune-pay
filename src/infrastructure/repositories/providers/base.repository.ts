import {ResourceNotFoundException} from "../../../domain/exceptions/resource-exceptions";
import {Repository} from "typeorm";
import {BaseM} from "../../../domain/model/base";
import {PaginatedItems} from "../../../domain/common/paginated-items";
import {PageOptionsInterface} from "../../../domain/common/page-options.interface";
import {PaginationMeta} from "../../../domain/common/pagination-meta";

export class BaseRepository<Model extends BaseM> {

    constructor(protected readonly entityRepository: Repository<any>) {
    }

    async insert(input: Omit<Model, keyof BaseM>): Promise<Model> {
        const result = await this.entityRepository.insert(input)
        return this.findById(result.raw[0].id)
    }

    async findById(id: number): Promise<Model> {
        const result = await this.entityRepository.findOne({where: {id}})
        if (!result) {
            throw new ResourceNotFoundException('user', {id})
        }
        return result as Model
    }

    async update(id: number, input: Partial<Omit<Model, keyof BaseM>>): Promise<Model> {
        await this.findById(id)
        const result = await this.entityRepository.save({id, ...input})
        return result as Model
    }

    async softRemove(id: number): Promise<void> {
        const entity = await this.findById(id)
        await this.entityRepository.softRemove(entity)
    }

    async findAll(where?: Partial<Model>): Promise<Model[]> {
        const result = await this.entityRepository.find({where})
        return result as Model[]
    }

    async findAllPaginated(pageOptions: PageOptionsInterface, where?: Partial<Model>): Promise<PaginatedItems<Model>> {
        const count = await this.entityRepository.count({
            where
        })
        const result = await this.entityRepository.find({
            where,
            take: pageOptions.take,
            skip: pageOptions.skip,
            order: {createdAt: pageOptions.order},
        })
        return new PaginatedItems<Model>(result as Model[], new PaginationMeta(pageOptions, count))
    }
}