import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {InvoiceMock} from "../../mock/invoice.mock";


describe('Invoice', () => {
    let app: NestApplication;
    let invoiceMock: InvoiceMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('invoice')
        app = await testUtils.initTestApp()
        invoiceMock = app.get(InvoiceMock)
    })
    beforeEach(async () => {
    })
    describe('POST /invoice', () => {
        it('should return 200', async () => {
            const invoice = await invoiceMock.getSample(0)
            const {order, currency} = await invoiceMock.prepareDependencies()
            invoice.orderId = order.id
            invoice.currencyId = currency.id
            invoice.shopId = order.shopId
            const res = await request(app.getHttpServer()).post('/invoice').send(invoice)
            expect(res.status).toBe(201);

        })
    })
    describe('GET /invoice', () => {
        it('should return 200', async () => {
            const invoice = await invoiceMock.createMock(1)
            const res = await request(app.getHttpServer()).get('/invoice/' + invoice.id).send().expect(200);

        })
    })
    describe('PUT /invoice', () => {
        it('should return 200', async () => {
            const invoice = await invoiceMock.createMock(0)
            const fieldsToUpdate = {}
            const res = await request(app.getHttpServer()).put('/invoice/' + invoice.id).send(fieldsToUpdate).expect(200);
        })
    })

    describe('DELETE /invoice', () => {
        it('should return 200', async () => {
            const invoice = await invoiceMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/invoice/' + invoice.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
