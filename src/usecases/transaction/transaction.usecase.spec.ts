import {NestApplication} from "@nestjs/core";
import {TestUtils} from "../../infrastructure/test-utils/init-test-app";
import {BscClientFactory} from "../../infrastructure/services/chain-manager/clients/bsc/bsc-client";
import {WalletMock} from "../../infrastructure/mock/entities/wallet.mock";
import {TransactionUsecase} from "./transaction.usecase";
import {WalletAddressMock} from "../../infrastructure/mock/entities/wallet-address.mock";
import {ChainMock} from "../../infrastructure/mock/entities/chain.mock";
import {ChainEnum} from "../../domain/enum/chain.enum";
import {WalletAddressWithRelations} from "../../domain/model/wallet-address";
import {AllSeed} from "../../seed/all.seed";

describe('Transaction Usecase', () => {
    let app: NestApplication;
    let testUtils: TestUtils;
    let bscClientFactory: BscClientFactory
    let transactionUsecase: TransactionUsecase
    let walletAddress: WalletAddressWithRelations
    beforeAll(async () => {
        testUtils = new TestUtils('transaction_usecase')
        app = await testUtils.initTestApp()
        bscClientFactory = app.get(BscClientFactory)
        transactionUsecase = app.get(TransactionUsecase)
    })
    beforeEach(async () => {
        const chain = await app.get(ChainMock).createCustom({
            name: ChainEnum.BSC
        })
        await app.get(AllSeed).runSeeds()
        const wallet = await app.get(WalletMock).createMock(0)
        const bscClient = await bscClientFactory.createClient(wallet)
        const address = await bscClient.getAddress()
        const wa = await app.get(WalletAddressMock).createCustom({
            walletId: wallet.id,
            chainId: chain.id,
            address
        })
        walletAddress = {...wa, chain, wallet}
    })
    it('should update all transactions', async () => {
        await transactionUsecase.updateAllTransactionsOfAddress(walletAddress)
        const transactions = await transactionUsecase.readAll()
        expect(transactions.length).toBe(3);
        expect(transactions[0].associatedAssetId).toBe(2)
        expect(transactions[0].amountReceived).toBe('0.000174035267100585')
    });
    it('should update transactions after a certain time', async () => {
        await transactionUsecase.updateTransactionsSince(walletAddress, new Date('2024-08-25T14:52:57.000Z'))
        const transactions = await transactionUsecase.readAll()
        expect(transactions.length).toBe(2);
        expect(transactions[0].associatedAssetId).toBe(1)
        expect(transactions[0].amountReceived).toBe('0.571069298120979319')
    })
    afterEach(async () => {
        await testUtils.clearDb()
    })
    afterAll(async () => {
        await app.close()
    })
})
