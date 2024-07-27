import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {AllSeed} from "../../../seed/all.seed";
import {TestUtils} from "../../test-utils/init-test-app";


describe('Health', () => {
    let app: NestApplication;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('health')
        app = await testUtils.initTestApp()
    })
    beforeEach(async () => {
        await app.get(AllSeed).runSeeds()
    })
    describe('GET /health', () => {
        it('should return 200', async () => {
            const res = await request(app.getHttpServer()).get('/health').send().expect(200);
            expect(res.body.health).toBe('OK')
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})