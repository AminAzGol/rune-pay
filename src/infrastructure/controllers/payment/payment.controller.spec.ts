import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {PaymentMock} from "../../mock/payment.mock";


describe('Payment', () => {
    let app: NestApplication;
    let paymentMock: PaymentMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('payment')
        app = await testUtils.initTestApp()
        paymentMock = app.get(PaymentMock)
    })
    beforeEach(async () => {
    })
    describe('POST /payment', () => {
        it('should return 200', async () => {
            const payment = await paymentMock.getSample(0)
            const {invoice, conversionRate} = await paymentMock.prepareDependencies()
            payment.conversionRateId = conversionRate.id
            payment.invoiceId = invoice.id
            payment.payAssetId = conversionRate.assetId
            payment.baseCurrencyId = conversionRate.currencyId
            const res = await request(app.getHttpServer()).post('/payment').send(payment)
            expect(res.status).toBe(201);

        })
    })
    describe('GET /payment', () => {
        it('should return 200', async () => {
            const payment = await paymentMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/payment/' + payment.id).send().expect(200);

        })
    })

    describe('DELETE /payment', () => {
        it('should return 200', async () => {
            const payment = await paymentMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/payment/' + payment.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
