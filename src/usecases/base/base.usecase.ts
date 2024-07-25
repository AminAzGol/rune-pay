import {BaseM} from "../../domain/model/base";
import {BaseRepository} from "../../infrastructure/repositories/base.repository";


export class BaseUsecase<Repo extends BaseRepository<Model>, Model extends BaseM> {
    constructor(private readonly repository: Repo) {
    }

    async create(input: Omit<Model, keyof BaseM>): Promise<Model> {
        return await this.repository.insert(input)
    }

    async readById(id: number): Promise<Model> {
        return await this.repository.findById(id)
    }

    async update(id: number, input: Omit<Model, keyof BaseM>): Promise<Model> {
        return await this.repository.update(id, input)
    }

    async delete(id): Promise<void> {
        return await this.repository.softRemove(id)
    }
}