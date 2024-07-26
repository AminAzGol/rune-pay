import {ResourceNotFoundException} from "../../../domain/exceptions/resource-exceptions";
import {Repository} from "typeorm";
import {BaseM} from "../../../domain/model/base";

export class BaseRepository<Model extends BaseM> {

    constructor(private readonly entityRepository: Repository<any>) {
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

    async findByEmail(email: string): Promise<Model> {
        const result = await this.entityRepository.findOne({where: {email}})
        if (!result) {
            throw new ResourceNotFoundException('user', {email})
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
}