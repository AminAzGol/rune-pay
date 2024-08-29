import {NestApplication} from "@nestjs/core";
import {TestUtils} from "../../../../test-utils/init-test-app";
import {MidgardClient} from "./midgard-client";
import {ChainEnum} from "../../../../../domain/enum/chain.enum";
import {AssetEnum} from "../../../../../domain/enum/asset.enum";

describe('MidgardClient', () => {
    let app: NestApplication;
    let testUtils: TestUtils;
    let midgardClient: MidgardClient
    beforeAll(async () => {
        testUtils = new TestUtils('midgard')
        app = await testUtils.initTestApp()
        midgardClient = app.get(MidgardClient)
    })
    beforeEach(async () => {
    })
    it('can get pool depth', async () => {
        const data = await midgardClient.getPoolInfo(ChainEnum.BSC, AssetEnum.BNB)
        expect(data.assetDepth).toBeDefined()
        expect(data.runeDepth).toBeDefined()
    })
    it('can get asset price', async () => {
        const price = await midgardClient.getAssetPriceUSD(ChainEnum.BSC, AssetEnum.USDT, '0X55D398326F99059FF775485246999027B3197955')
        expect(Math.round(price)).toBe(1)
    })
    it('can get chains', async () => {
        const data = await midgardClient.getAssetsWithPrice()
        const btc = data.find(o => o.asset === "BTC" && o.chain === 'BTC')
        expect(btc).toBeDefined()
    })
    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})