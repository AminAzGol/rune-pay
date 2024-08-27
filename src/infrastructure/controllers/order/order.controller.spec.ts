import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {OrderMock} from "../../mock/entities/order.mock";
import {OrderStatusEnum} from "../../../domain/enum/order-status.enum";


describe('Order', () => {
    let app: NestApplication;
    let orderMock: OrderMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('order')
        app = await testUtils.initTestApp()
        orderMock = app.get(OrderMock)
    })
    beforeEach(async () => {
    })
    describe('POST /order', () => {
        it('should return 200', async () => {
            const order = await orderMock.getSample(0)
            const {shop} = await orderMock.prepareDependencies()
            order.shopId = shop.id
            const res = await request(app.getHttpServer()).post('/order').send(order)
            expect(res.status).toBe(201);
        })
    })
    describe('GET /order', () => {
        it('should return 200', async () => {
            const order = await orderMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/order/' + order.id).send().expect(200);
        })
    })
    describe('PUT /order', () => {
        it('should return 200', async () => {
            const order = await orderMock.createMock(0)
            const fieldsToUpdate = {
                totalPrice: 2000,
                customerName: 'albert',
                customerAddress: 'einstein',
                customerEmail: 'albert.einstein@gmail.com',
                status: OrderStatusEnum.CANCELED
            }
            const res = await request(app.getHttpServer()).put('/order/' + order.id).send(fieldsToUpdate).expect(200);
        })
    })

    describe('DELETE /order', () => {
        it('should return 200', async () => {
            const order = await orderMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/order/' + order.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
