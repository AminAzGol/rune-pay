import {NestApplication} from "@nestjs/core";
import {TestUtils} from "../../../test-utils/init-test-app";
import {BscClientFactory} from "./bsc-client";
import {WalletMock} from "../../../mock/entities/wallet.mock";
import {AllSeed} from "../../../../seed/all.seed";

describe('BSCClient', () => {
    let app: NestApplication;
    let testUtils: TestUtils;
    let bscClientFactory: BscClientFactory
    beforeAll(async () => {
        testUtils = new TestUtils('bsc_client')
        app = await testUtils.initTestApp()
        bscClientFactory = app.get(BscClientFactory)
    })
    beforeEach(async () => {
        await app.get(AllSeed).runSeeds()
    })
    it('can get token transactions of an address', async () => {
        const wallet = await app.get(WalletMock).createMock(0)
        const bscClient = await bscClientFactory.createClient(wallet)
        const address = await bscClient.getAddress()
        const transactions = await bscClient.getTokenList(address, 1, 10)
        expect(transactions[0].assetName).toBe('BUSD')
        expect(transactions[1].assetName).toBe('BSC-USD')
    })
    it('can get transactions of an address', async () => {
        const wallet = await app.get(WalletMock).createMock(0)
        const bscClient = await bscClientFactory.createClient(wallet)
        const address = await bscClient.getAddress()
        const transactions = await bscClient.getTxList(address, 1, 10)
        expect(transactions[0].assetName).toBe('BNB')
    })
    it('can get txs since', async () => {
        const wallet = await app.get(WalletMock).createMock(0)
        const bscClient = await bscClientFactory.createClient(wallet)
        const address = await bscClient.getAddress()
        const transactions = await bscClient.getTransactionsSince(address, new Date('2024-08-25T14:52:57.000Z'))
        expect(transactions.length).toBe(2)
        expect(transactions[1].assetName).toBe('BUSD')
        expect(transactions[0].assetName).toBe('BSC-USD')
    })
    afterEach(async () => {
        await testUtils.clearDb()
    })
    afterAll(async () => {
        await app.close()
    })
})