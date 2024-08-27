import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {ShopWalletAddressMock} from "../../mock/entities/shop-wallet-address.mock";


describe('ShopWalletAddress', () => {
    let app: NestApplication;
    let shopWalletAddressMock: ShopWalletAddressMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('shop_wallet_address')
        app = await testUtils.initTestApp()
        shopWalletAddressMock = app.get(ShopWalletAddressMock)
    })
    beforeEach(async () => {
    })
    describe('POST /shop-wallet-address', () => {
        it('should return 200', async () => {
            const shopWalletAddress = await shopWalletAddressMock.getSample(0)
            const {shop, asset} = await shopWalletAddressMock.prepareDependencies()
            shopWalletAddress.shopId = shop.id
            shopWalletAddress.assetId = asset.id
            const res = await request(app.getHttpServer()).post('/shop-wallet-address').send(shopWalletAddress)
            expect(res.status).toBe(201);

        })
    })
    describe('GET /shop-wallet-address', () => {
        it('should return 200', async () => {
            const shopWalletAddress = await shopWalletAddressMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/shop-wallet-address/' + shopWalletAddress.id).send().expect(200);

        })
    })
    describe('PUT /shop-wallet-address', () => {
        it('should return 200', async () => {
            const shopWalletAddress = await shopWalletAddressMock.createMock(0)
            const fieldsToUpdate = {address: 'aaabbbcc'}
            const res = await request(app.getHttpServer()).put('/shop-wallet-address/' + shopWalletAddress.id).send(fieldsToUpdate).expect(200);
        })
    })

    describe('DELETE /shop-wallet-address', () => {
        it('should return 200', async () => {
            const shopWalletAddress = await shopWalletAddressMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/shop-wallet-address/' + shopWalletAddress.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
