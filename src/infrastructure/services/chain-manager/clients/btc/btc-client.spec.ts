import {NestApplication} from "@nestjs/core";
import {TestUtils} from "../../../../test-utils/init-test-app";
import {BscClientFactory} from "../bsc/bsc-client";
import {AllSeed} from "../../../../../seed/all.seed";
import {BtcClientFactory} from "./btc-client.factory";
import {WalletMock} from "../../../../mock/entities/wallet.mock";

describe('BTC Client', () => {
    let app: NestApplication;
    let testUtils: TestUtils;
    let btcClientFactory: BscClientFactory
    beforeAll(async () => {
        testUtils = new TestUtils('btc_client')
        app = await testUtils.initTestApp()
        btcClientFactory = app.get(BtcClientFactory)
    })
    beforeEach(async () => {
        await app.get(AllSeed).runSeeds()
    })
    it('should get address', async () => {
        const wallet = await app.get(WalletMock).createMock(0)
        const client = await btcClientFactory.createClient(wallet)
        const address = await client.getAddress()
        expect(address).toBeDefined()
        expect(address).toBe('bc1qygxm3shsuj9390mrl756thcx5k7qtp6y78nwp2')
    })
    afterEach(async () => {
        await testUtils.clearDb()
    })
    afterAll(async () => {
        await app.close()
    })
})
