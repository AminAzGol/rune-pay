import {NestApplication} from "@nestjs/core";
import dbCleaner from '../../common/utils/database_cleaner'
import * as request from 'supertest';
import {AllSeed} from "../../../seed/all.seed";
import {initTestApp} from "../../test-components/init-test-app";


describe('Health', () => {
    let app: NestApplication;
    beforeAll(async () => {
        app = await initTestApp()
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
        await dbCleaner.clearDB();
    });
})