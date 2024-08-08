import {BaseM} from "../../domain/model/base";
import {BaseRepository} from "../../infrastructure/repositories/providers/base.repository";


export class BaseUsecase<Repo extends BaseRepository<Model>, Model extends BaseM> {
    constructor(protected readonly repository: Repo) {
    }

    async create(input: Omit<Model, keyof BaseM>): Promise<Model> {
        return await this.repository.insert(input)
    }

    async readById(id: number): Promise<Model> {
        return await this.repository.findById(id)
    }

    async update(id: number, input: Partial<Omit<Model, keyof BaseM>>): Promise<Model> {
        return await this.repository.update(id, input)
    }

    async delete(id): Promise<void> {
        return await this.repository.softRemove(id)
    }

    async readAll(): Promise<Model[]> {
        return await this.repository.findAll()
    }
}