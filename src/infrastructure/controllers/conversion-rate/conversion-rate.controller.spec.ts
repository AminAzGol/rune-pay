import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {ConversionRateMock} from "../../mock/entities/conversion-rate.mock";
import {ConversionRateUsecase} from "../../../usecases/conversion-rate/conversion-rate.usecase";
import {AllSeed} from "../../../seed/all.seed";
import {AssetUsecase} from "../../../usecases/asset/asset.usecase";


describe('ConversionRate', () => {
    let app: NestApplication;
    let conversionRateMock: ConversionRateMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('conversion_rate')
        app = await testUtils.initTestApp()
        conversionRateMock = app.get(ConversionRateMock)
    })
    beforeEach(async () => {
        await app.get(AllSeed).runSeeds()
    })
    describe('conversion-rate.usecase', () => {
        it('can update all assets', async () => {
            const conversionUsecase = app.get(ConversionRateUsecase)
            await conversionUsecase.updateAllConversionRates()
            const conversions = await conversionUsecase.readAll()
            const assets = await app.get(AssetUsecase).readAll()
            for (const asset of assets) {
                const conversion = conversions.find(o => asset.id === o.assetId)
                expect(conversion).toBeDefined()
            }
        })
    })
    describe('POST /conversion-rate', () => {
        it('should return 200', async () => {
            const conversionRate = await conversionRateMock.getSample(0)
            const {asset, currency} = await conversionRateMock.prepareDependencies()
            conversionRate.assetId = asset.id
            conversionRate.currencyId = currency.id
            const res = await request(app.getHttpServer()).post('/conversion-rate').send(conversionRate)
            expect(res.status).toBe(201);

        })
    })
    describe('GET /conversion-rate', () => {
        it('should return 200', async () => {
            const conversionRate = await conversionRateMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/conversion-rate/' + conversionRate.id).send().expect(200);

        })
    })
    describe('PUT /conversion-rate', () => {
        it('should return 200', async () => {
            const conversionRate = await conversionRateMock.createMock(0)
            const fieldsToUpdate = {rate: 200, expiresAt: new Date()}
            const res = await request(app.getHttpServer()).put('/conversion-rate/' + conversionRate.id).send(fieldsToUpdate).expect(200);
        })
    })

    describe('DELETE /conversion-rate', () => {
        it('should return 200', async () => {
            const conversionRate = await conversionRateMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/conversion-rate/' + conversionRate.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
