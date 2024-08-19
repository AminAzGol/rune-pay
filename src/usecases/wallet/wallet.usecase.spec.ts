import {NestApplication} from "@nestjs/core";
import {TestUtils} from "../../infrastructure/test-utils/init-test-app";
import {WalletUsecase} from "./wallet.usecase";
import {AllSeed} from "../../seed/all.seed";
import {WalletAddressRepository} from "../../infrastructure/repositories/providers/wallet-address.repository";
import {ChainRepository} from "../../infrastructure/repositories/providers/chain.repository";

describe('Wallet Usecase', () => {
    let app: NestApplication;
    let testUtils: TestUtils;
    let walletUsecase: WalletUsecase
    let walletAddressRepository: WalletAddressRepository
    beforeAll(async () => {
        testUtils = new TestUtils('wallet_usecase')
        app = await testUtils.initTestApp()
        walletUsecase = app.get(WalletUsecase)
        walletAddressRepository = app.get(WalletAddressRepository)
    })
    beforeEach(async () => {
        await app.get(AllSeed).runSeeds()
    })
    describe('generate()', () => {
        it('should generate a wallet and addresses', async () => {
            const wallet = await walletUsecase.generate()
            const chains = await app.get(ChainRepository).findAll()
            const addresses = await app.get(WalletAddressRepository).findAll()
            for (const chain of chains) {
                const address = addresses.find(o => o.chainId === chain.id)
                expect(address).toBeDefined()
                expect(address.walletId).toBe(wallet.id)
            }

        })
    })
    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})