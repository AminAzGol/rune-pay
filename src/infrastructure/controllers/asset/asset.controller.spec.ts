import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {AssetMock} from "../../mock/asset.mock";


describe('Asset', () => {
    let app: NestApplication;
    let assetMock: AssetMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('asset')
        app = await testUtils.initTestApp()
        assetMock = app.get(AssetMock)
    })
    beforeEach(async () => {
    })
    describe('POST /asset', () => {
        it('should return 201', async () => {
            const asset = await assetMock.getSample(0)
            const {chain} = await assetMock.prepareDependencies()
            asset.chainId = chain.id
            const res = await request(app.getHttpServer()).post('/asset').send(asset)
            expect(res.status).toBe(201);

        })
    })
    describe('GET /asset', () => {
        it('should return 200', async () => {
            const asset = await assetMock.createMock(0)

            const res = await request(app.getHttpServer()).get('/asset/' + asset.id).send().expect(200);

        })
    })
    describe('DELETE /asset', () => {
        it('should return 200', async () => {
            const asset = await assetMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/asset/' + asset.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
