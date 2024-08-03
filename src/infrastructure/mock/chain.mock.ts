import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {ChainM} from "../../domain/model/chain";
import {ChainRepository} from "../repositories/providers/chain.repository";


@Injectable()
export class ChainMock extends BaseMock<ChainM> {

    constructor(repository: ChainRepository) {
        const samples = [
            {name: 'BSC', minConfirmations: 10}
        ]
        super(repository, samples);
    }
}