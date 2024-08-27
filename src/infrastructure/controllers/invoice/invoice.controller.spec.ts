import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {InvoiceMock} from "../../mock/entities/invoice.mock";
import {ShopM} from "../../../domain/model/shop";
import {UserM} from "../../../domain/model/user";


describe('Invoice', () => {
    let app: NestApplication;
    let invoiceMock: InvoiceMock;
    let testUtils: TestUtils;
    let authInfo: { accessToken: string, shop: ShopM, user: UserM }
    beforeAll(async () => {
        testUtils = new TestUtils('invoice')
        app = await testUtils.initTestAppWithAuthGuard()
        invoiceMock = app.get(InvoiceMock)
    })
    beforeEach(async () => {
        authInfo = await testUtils.signShopOwnerToken()
    })
    describe('POST /invoice', () => {
        it('should return 200', async () => {
            const sample = await invoiceMock.getSample(0)
            const {currency} = await invoiceMock.prepareDependencies({order: true})
            const res = await request(app.getHttpServer()).post('/invoice')
                .set('shop-id', '' + authInfo.shop.id)
                .set('authorization', authInfo.accessToken).send({
                    currencyId: currency.id,
                    amount: sample.amount
                })
            expect(res.status).toBe(201);
        })
    })
    describe('GET /invoice', () => {
        it('should return 200', async () => {
            const sample = await invoiceMock.getSample(0)
            const {currency} = await invoiceMock.prepareDependencies({order: true})
            const invoice = await invoiceMock.createCustom({
                currencyId: currency.id,
                shopId: authInfo.shop.id,
                amount: sample.amount,
                status: sample.status,
                expiresAt: sample.expiresAt
            })
            const res = await request(app.getHttpServer()).get('/invoice/').query({
                take: 10,
                skip: 0,
                order: "DESC"
            })
                .set('shop-id', '' + authInfo.shop.id)
                .set('authorization', authInfo.accessToken)
                .send()
            expect(res.status).toBe(200)
            expect(res.body.data[0].id).toBe(invoice.id)
            expect(res.body.meta.itemCount).toBe(1)
        })
    })
    describe('PUT /invoice', () => {
        xit('should return 200', async () => {
            const invoice = await invoiceMock.createMock(0)
            const fieldsToUpdate = {}
            const res = await request(app.getHttpServer()).put('/invoice/' + invoice.id).send(fieldsToUpdate).expect(200);
        })
    })

    describe('DELETE /invoice', () => {
        xit('should return 200', async () => {
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
