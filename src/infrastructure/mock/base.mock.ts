import {BaseRepository} from "../repositories/providers/base.repository";
import {BaseM} from "../../domain/model/base";

export class BaseMock<Model extends BaseM> {
    constructor(private readonly repository: BaseRepository<Model>, private readonly mockSamples: any[]) {
    }

    getSample(index): Model {
        return this.mockSamples[index]
    }

    async createMock(index): Promise<Model> {
        return this.repository.insert(this.mockSamples[index])
    }

    async createCustom(input: Omit<Model, keyof BaseM>): Promise<Model> {
        return this.repository.insert(input)
    }

    async updateMock(id, input: Partial<Model>): Promise<Model> {
        return this.repository.update(id, input)
    }

}