import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {WalletM} from "../../../domain/model/wallet";
import {Repository} from "typeorm";
import {WalletEntity} from "../../entities/wallet.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ResourceNotFoundException} from "../../../domain/exceptions/resource-exceptions";

@Injectable()
export class WalletRepository extends BaseRepository<WalletM> {

    constructor(@InjectRepository(WalletEntity) entityRepository: Repository<WalletEntity>) {
        super(entityRepository);
    }

    async acquireWallet(): Promise<WalletM> {
        let tryCount = 0
        while (tryCount < 4) {
            tryCount++
            try {
                return await this.acquireWalletTransaction()
            } catch (e) {
                if (e instanceof ResourceNotFoundException) {
                    throw e
                }
            }
        }
        throw new Error("Failed to acquire a wallet (possible SERIALIZABLE conflict)")
    }

    private async acquireWalletTransaction(): Promise<WalletM> {
        return await this.entityRepository.manager.transaction('SERIALIZABLE', async (transactionManager): Promise<WalletM> => {
            const nonAcquiredWallet = await transactionManager.findOne<WalletEntity>(WalletEntity, {where: {acquired: false}})
            if (!nonAcquiredWallet) {
                throw new ResourceNotFoundException('Wallet', {acquired: false})
            }
            await transactionManager.update<WalletEntity>(WalletEntity, {id: nonAcquiredWallet.id}, {acquired: true})
            nonAcquiredWallet.acquired = true
            return nonAcquiredWallet
        })
    }
}