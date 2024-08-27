import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {OrderProductPriceMock} from "../../mock/entities/order-product-price.mock";


describe('OrderProductPrice', () => {
    let app: NestApplication;
    let orderProductPriceMock: OrderProductPriceMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('order_product_price')
        app = await testUtils.initTestApp()
        orderProductPriceMock = app.get(OrderProductPriceMock)
    })
    beforeEach(async () => {
    })
    describe('POST /order-product-price', () => {
        it('should return 200', async () => {
            const {order, productPrice} = await orderProductPriceMock.prepareDependencies()
            const record = {
                orderId: order.id,
                productPriceId: productPrice.id
            }
            const res = await request(app.getHttpServer()).post('/order-product-price').send(record)
            expect(res.status).toBe(201);

        })
    })
    describe('GET /order-product-price', () => {
        it('should return 200', async () => {
            const orderProductPrice = await orderProductPriceMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/order-product-price/' + orderProductPrice.id).send().expect(200);

        })
    })

    describe('DELETE /order-product-price', () => {
        it('should return 200', async () => {
            const orderProductPrice = await orderProductPriceMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/order-product-price/' + orderProductPrice.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
