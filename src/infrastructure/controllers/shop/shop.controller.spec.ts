import {NestApplication} from "@nestjs/core";
import dbCleaner from '../../common/utils/database_cleaner'
import * as request from 'supertest';
import {initTestApp} from "../../test-components/init-test-app";
import {ShopMock} from "../../mock/shop.mock";


describe('Shop', () => {
    let app: NestApplication;
    let shopMock: ShopMock
    beforeAll(async () => {
        app = await initTestApp()
        shopMock = app.get(ShopMock)
    })
    beforeEach(async () => {
    })
    describe('POST /shop', () => {
        it('should return 200', async () => {
            const shop = await shopMock.getSample(1)
            const res = await request(app.getHttpServer()).post('/shop').send(shop).expect(201);
            expect(res.body.name).toBe(shop.name)
            expect(res.body.password).toBe(undefined)
        })
    })
    describe('GET /shop', () => {
        it('should return 200', async () => {
            const shop = await shopMock.createMock(1)
            const res = await request(app.getHttpServer()).get('/shop/' + shop.id).send().expect(200);
            expect(res.body.name).toBe(shop.name)
        })
    })
    describe('PUT /shop', () => {
        it('should return 200', async () => {
            const shop = await shopMock.createMock(1);
            const name = 'jeff.bezos@gmail.com'
            const res = await request(app.getHttpServer()).put('/shop/' + shop.id).send({name}).expect(200);
            expect(res.body.name).toBe(name)
        })
    })

    describe('DELETE /shop', () => {
        it('should return 200', async () => {
            const shop = await shopMock.createMock(1)
            const res = await request(app.getHttpServer()).delete('/shop/' + shop.id).send().expect(200);
            expect(res.body.name).toBe(undefined)
        })
    })

    afterEach(async () => {
        await dbCleaner.clearDB();
    });
    afterAll(async () => {
        await dbCleaner.closeConnection()
        await app.close()
    })
})