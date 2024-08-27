import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {ShopUserMock} from "../../mock/entities/shop-user.mock";


describe('ShopUser', () => {
    let app: NestApplication;
    let shopUserMock: ShopUserMock
    let testUtils: TestUtils
    beforeAll(async () => {
        testUtils = new TestUtils('shop_user')
        app = await testUtils.initTestApp()
        shopUserMock = app.get(ShopUserMock)
    })
    beforeEach(async () => {
    })
    describe('POST /shop-user', () => {
        it('should return 200', async () => {
            const {user, shop} = await shopUserMock.prepareDependencies()
            const res = await request(app.getHttpServer()).post('/shop-user').send({
                userId: user.id,
                shopId: shop.id
            }).expect(201);
            expect(res.body.shopId).toBe(shop.id)
            expect(res.body.userId).toBe(user.id)
        })
        it('should return 404', async () => {
            const {shop} = await shopUserMock.prepareDependencies({user: true})
            const res = await request(app.getHttpServer()).post('/shop-user').send({
                userId: 10,
                shopId: shop.id
            })
            expect(res.status).toBe(404)
        })
    })
    describe('DELETE /shop-user', () => {
        it('should return 200', async () => {
            const {user, shop} = await shopUserMock.prepareDependencies()
            const shopUser = await shopUserMock.createCustom({userId: user.id, shopId: shop.id})
            const res = await request(app.getHttpServer()).delete('/shop-user/' + shopUser.id).send().expect(200);
        })
        it('should return 404', async () => {
            await request(app.getHttpServer()).delete('/shop-user/' + 1).send().expect(404);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})