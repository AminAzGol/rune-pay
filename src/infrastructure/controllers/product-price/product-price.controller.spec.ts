import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {ProductPriceMock} from "../../mock/product-price.mock";


describe('ProductPrice', () => {
    let app: NestApplication;
    let productPriceMock: ProductPriceMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('product_price')
        app = await testUtils.initTestApp()
        productPriceMock = app.get(ProductPriceMock)
    })
    beforeEach(async () => {
    })
    describe('POST /productPrice', () => {
        it('should return 200', async () => {
            const productPrice = await productPriceMock.getSample(1)
            const {product, currency} = await productPriceMock.prepareDependencies()
            productPrice.productId = product.id
            productPrice.currencyId = currency.id
            const res = await request(app.getHttpServer()).post('/product-price').send(productPrice)
            expect(res.status).toBe(201);
            expect(res.body.productId).toBe(productPrice.productId)
            expect(res.body.currencyId).toBe(productPrice.currencyId)
            expect(res.body.isActive).toBe(productPrice.isActive)
            expect(res.body.price).toBe(productPrice.price)
        })
    })
    describe('GET /productPrice', () => {
        it('should return 200', async () => {
            const productPrice = await productPriceMock.createMock(1)
            const res = await request(app.getHttpServer()).get('/product-price/' + productPrice.id).send().expect(200);
            expect(res.body.productId).toBe(productPrice.productId)
            expect(res.body.price).toBe(productPrice.price)
            expect(res.body.isActive).toBe(productPrice.isActive)
        })
    })
    describe('PUT /productPrice', () => {
        it('should return 200', async () => {
            const productPrice = await productPriceMock.createMock(1)
            await productPriceMock.createCustom(productPrice)
            const fieldsToUpdate = {
                isActive: false
            }
            const res = await request(app.getHttpServer()).put('/product-price/' + productPrice.id).send(fieldsToUpdate).expect(200);
            expect(res.body.isActive).toBe(fieldsToUpdate.isActive)
        })
    })

    describe('DELETE /productPrice', () => {
        it('should return 200', async () => {
            const productPrice = await productPriceMock.createMock(1)
            await productPriceMock.createCustom(productPrice)
            const res = await request(app.getHttpServer()).delete('/product-price/' + productPrice.id).send().expect(200);
            expect(res.body.price).toBe(undefined)
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
