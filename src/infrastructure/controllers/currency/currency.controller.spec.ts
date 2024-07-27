import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {CurrencyMock} from "../../mock/currency.mock";


describe('Currency', () => {
    let app: NestApplication;
    let currencyMock: CurrencyMock
    let testUtils: TestUtils
    beforeAll(async () => {
        testUtils = new TestUtils('currency')
        app = await testUtils.initTestApp()
        currencyMock = app.get(CurrencyMock)
    })
    describe('POST /currency', () => {
        it('should return 200', async () => {
            const currency = {name: 'USD'}
            const res = await request(app.getHttpServer()).post('/currency').send(currency).expect(201);
            expect(res.body.name).toBe(currency.name)
        })
    })
    describe('DELETE /currency/:id', () => {
        it('should return 200', async () => {
            const currency = await currencyMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/currency/' + currency.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})