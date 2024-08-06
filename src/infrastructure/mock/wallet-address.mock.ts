import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {WalletAddressM} from "../../domain/model/wallet-address";
import {WalletAddressRepository} from "../repositories/providers/wallet-address.repository";
import {ChainMock} from "./chain.mock";
import {WalletMock} from "./wallet.mock";
import {ChainM} from "../../domain/model/chain";
import {WalletM} from "../../domain/model/wallet";


@Injectable()
export class WalletAddressMock extends BaseMock<WalletAddressM> {

    constructor(repository: WalletAddressRepository, private readonly chainMock: ChainMock, private readonly walletMock: WalletMock) {
        const samples = [
            {
                address: 'xyz'
            }
        ]
        super(repository, samples);
    }

    async prepareDependencies(except?: { chain?: boolean, wallet?: boolean }) {
        const result = {chain: undefined as ChainM, wallet: undefined as WalletM}
        if (!except?.chain) {
            result.chain = await this.chainMock.createMock(0)
        }
        if (!except?.wallet) {
            result.wallet = await this.walletMock.createMock(0)
        }
        return result
    }

    async createMock(index: number): Promise<WalletAddressM> {
        const sample = this.getSample(index)
        const {wallet, chain} = await this.prepareDependencies()
        return await this.createCustom({...sample, walletId: wallet.id, chainId: chain.id})
    }
}