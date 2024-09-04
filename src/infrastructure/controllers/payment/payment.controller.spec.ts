import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {PaymentMock} from "../../mock/entities/payment.mock";
import {AllSeed} from "../../../seed/all.seed";
import {InvoiceMock} from "../../mock/entities/invoice.mock";
import {InvoiceStatusEnum} from "../../../domain/enum/invoice-status.enum";
import {DateUtils} from "../../common/utils/date.utils";
import {CurrencyRepository} from "../../repositories/providers/currency.repository";
import {BASE_CURRENCY} from "../../../domain/common/base-currency";
import {ConversionRateMock} from "../../mock/entities/conversion-rate.mock";
import {AssetRepository} from "../../repositories/providers/asset.repository";
import {PaymentStatusEnum} from "../../../domain/enum/payment-status.enum";


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
        await app.get(AllSeed).runSeeds()
    })
    describe('POST /payment', () => {
        it('should return 200', async () => {
            const invoiceMock = app.get(InvoiceMock)
            const conversionRateMock = app.get(ConversionRateMock)
            const baseCurrency = await app.get(CurrencyRepository).findByName(BASE_CURRENCY)
            const {order} = await invoiceMock.prepareDependencies({currency: true})
            const invoice = await invoiceMock.createCustom({
                amount: 10,
                status: InvoiceStatusEnum.PENDING,
                expiresAt: DateUtils.getNextXHours(2),
                orderId: order.id,
                shopId: order.shopId,
                currencyId: baseCurrency.id
            })
            const assets = await app.get(AssetRepository).findAll()
            const conversionRate = await conversionRateMock.createCustom({
                assetId: assets[0].id,
                currencyId: baseCurrency.id,
                rate: 0.25,
                expiresAt: DateUtils.getNextXMinutes(1)
            })
            const res = await request(app.getHttpServer()).post('/payment').send({
                invoiceId: invoice.id,
                payAssetId: conversionRate.assetId
            })
            expect(res.status).toBe(201);
        })
    })
    describe('GET /payment/:id', () => {
        it('should return 200', async () => {
            const payment = await paymentMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/payment/' + payment.id).send()
            expect(res.status).toBe(200)
            expect(res.body.id).toBe(payment.id)
        })
    })

    describe('PUT /payment/:id/renew', () => {
        it('should return 200', async () => {
            const payment = await paymentMock.createMock(1)
            const res = await request(app.getHttpServer()).put(`/payment/${payment.id}/renew`).send()
            expect(res.status).toBe(200)
            expect(res.body.id).toBe(payment.id + 1)
            expect(res.body.status).toBe(PaymentStatusEnum.PENDING)
        })
    })
    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
