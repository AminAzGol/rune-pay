import {Injectable} from "@nestjs/common";
import {ChainRepository} from "../../infrastructure/repositories/providers/chain.repository";
import {ChainEnum} from "../../domain/enum/chain.enum";

@Injectable()
export class ChainSeed {
    constructor(private readonly chainRepository: ChainRepository) {
    }

    async runSeed(): Promise<void> {
        for (const chain of Object.values(ChainEnum)) {
            const existing = await this.chainRepository.findByName(chain)
            if (!existing) {
                await this.chainRepository.insert({name: chain})
            }
        }
    }
}