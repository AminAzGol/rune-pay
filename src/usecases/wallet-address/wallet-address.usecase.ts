import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {WalletAddressRepository} from "../../infrastructure/repositories/providers/wallet-address.repository";
import {WalletAddressM} from "../../domain/model/wallet-address";
import {WalletM} from "../../domain/model/wallet";
import {ChainM} from "../../domain/model/chain";
import {ChainManagerService} from "../../infrastructure/services/chain-manager/chain-manager.service";
import {ChainEnum} from "../../domain/enum/chain.enum";

@Injectable()
export class WalletAddressUsecase extends BaseUsecase<WalletAddressRepository, WalletAddressM> {

    constructor(repository: WalletAddressRepository, private readonly chainManagerService: ChainManagerService) {
        super(repository);
    }

    async createIfNotExists(wallet: WalletM, chain: ChainM): Promise<WalletAddressM> {
        const existingRecords = await this.repository.findAll({chainId: chain.id, walletId: wallet.id})
        if (existingRecords?.length > 0) {
            return existingRecords[0]
        }
        const chainClient = await this.chainManagerService.getChainClient(chain.name as ChainEnum, wallet)
        const address = await chainClient.getAddress()
        return await this.repository.insert({
            walletId: wallet.id,
            chainId: chain.id,
            address,
        })
    }
}