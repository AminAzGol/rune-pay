import {HealthM} from "../model/health";
import {BaseM} from "../model/base";

export interface HealthRepositoryInterface {
    findById(id: number): Promise<HealthM>

    insert(input: Omit<HealthM, keyof BaseM>): Promise<HealthM>
}