import {NestApplication} from "@nestjs/core";
import {TestUtils} from "../../../../test-utils/init-test-app";
import {AllSeed} from "../../../../../seed/all.seed";
import {BtcClientFactory} from "./btc-client.factory";
import {WalletMock} from "../../../../mock/entities/wallet.mock";
import {BtcClient} from "./btc-client";

describe('BTC Client', () => {
    let app: NestApplication;
    let testUtils: TestUtils;
    let btcClientFactory: BtcClientFactory
    let client: BtcClient
    beforeAll(async () => {
        testUtils = new TestUtils('btc_client')
        app = await testUtils.initTestApp()
        btcClientFactory = app.get(BtcClientFactory)
    })
    beforeEach(async () => {
        await app.get(AllSeed).runSeeds()
        const wallet = await app.get(WalletMock).createMock(0)
        client = await btcClientFactory.createClient(wallet)
    })
    it('should get address ', async () => {
        const address = await client.getAddress()
        expect(address).toBeDefined()
        // expect(address).toBe('bc1qygxm3shsuj9390mrl756thcx5k7qtp6y78nwp2')
        expect(address).toBe('tb1qygxm3shsuj9390mrl756thcx5k7qtp6y5pga6e')
    })
    it('can get transactions', async () => {
        const address = await client.getAddress()
        const transactions = await client.getTransactionsSince(address, new Date('1979-01-01'))
        expect(transactions.length).toBe(2)
        expect(transactions[0].assetName).toBe('BTC')
        expect(transactions[0].hash).toBe('04076d68332a18ce65d193e65fe213679f1cae722c4abd6ef23185904991cb7d')
        expect(transactions[0].to[0].amount).toBe('0.00011495')
    })
    it('can get transactions after txid', async () => {
        const address = await client.getAddress()
        const transactions = await client.getTxs(address, '04076d68332a18ce65d193e65fe213679f1cae722c4abd6ef23185904991cb7d')
        expect(transactions[0].hash).toBe('b4d001066cf0351ef6689fe121b6e1176d6b61c145d26911a4b4eddaa2c6269e')
    })
    afterEach(async () => {
        await testUtils.clearDb()
    })
    afterAll(async () => {
        await app.close()
    })
})
