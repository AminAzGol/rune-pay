import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {ProductMock} from "../../mock/product.mock";


describe('Product', () => {
    let app: NestApplication;
    let productMock: ProductMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('product')
        app = await testUtils.initTestApp()
        productMock = app.get(ProductMock)
    })
    beforeEach(async () => {
    })
    describe('POST /product', () => {
        it('should return 200', async () => {
            const product = await productMock.getSample(0)
            const {shop} = await productMock.prepareDependencies()
            product.shopId = shop.id
            const res = await request(app.getHttpServer()).post('/product').send(product)
            expect(res.status).toBe(201);
            expect(res.body.shopId).toBe(product.shopId)
            expect(res.body.name).toBe(product.name)
            expect(res.body.isActive).toBe(product.isActive)
        })
    })
    describe('GET /product', () => {
        it('should return 200', async () => {
            const product = await productMock.createMock(1)
            const res = await request(app.getHttpServer()).get('/product/' + product.id).send().expect(200);
            expect(res.body.shopId).toBe(product.shopId)
            expect(res.body.name).toBe(product.name)
            expect(res.body.isActive).toBe(product.isActive)
        })
    })
    describe('PUT /product', () => {
        it('should return 200', async () => {
            const product = await productMock.createMock(1)
            await productMock.createCustom(product)
            const fieldsToUpdate = {
                name: 'automobile',
                isActive: false
            }
            const res = await request(app.getHttpServer()).put('/product/' + product.id).send(fieldsToUpdate).expect(200);
            expect(res.body.name).toBe(fieldsToUpdate.name)
            expect(res.body.isActive).toBe(fieldsToUpdate.isActive)
        })
    })

    describe('DELETE /product', () => {
        it('should return 200', async () => {
            const product = await productMock.createMock(1)
            await productMock.createCustom(product)
            const res = await request(app.getHttpServer()).delete('/product/' + product.id).send().expect(200);
            expect(res.body.name).toBe(undefined)
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
