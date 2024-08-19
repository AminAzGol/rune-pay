import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {WalletRepository} from "../../infrastructure/repositories/providers/wallet.repository";
import {WalletM} from "../../domain/model/wallet";
import {WalletService} from "../../infrastructure/services/xchainjs/wallet/wallet.service";
import {WalletAddressM} from "../../domain/model/wallet-address";
import {ChainManagerService} from "../../infrastructure/services/xchainjs/chain/chain-manager.service";
import {BaseM} from "../../domain/model/base";
import {ChainRepository} from "../../infrastructure/repositories/providers/chain.repository";
import {WalletAddressRepository} from "../../infrastructure/repositories/providers/wallet-address.repository";

@Injectable()
export class WalletUsecase extends BaseUsecase<WalletRepository, WalletM> {

    constructor(
        repository: WalletRepository,
        private readonly walletAddressRepository: WalletAddressRepository,
        private readonly chainRepository: ChainRepository,
        private readonly walletService: WalletService,
        private readonly chainManagerService: ChainManagerService
    ) {
        super(repository);
    }

    async generate(): Promise<WalletM> {
        const keystore = await this.walletService.generateKeystore()
        const wallet = await this.repository.insert({
            keystore: JSON.stringify(keystore)
        })
        const addresses: Omit<WalletAddressM, keyof BaseM>[] = []
        const clients = await this.chainManagerService.getAllClients(wallet)
        const chains = await this.chainRepository.findAll()
        for (const chain of chains) {
            const client = clients[chain.name]
            const address = await client.getAddress()
            addresses.push(
                {walletId: wallet.id, address, chainId: chain.id}
            )
        }
        /* save all addresses */
        await Promise.all(addresses.map(o => this.walletAddressRepository.insert(o)))
        return wallet
    }
}