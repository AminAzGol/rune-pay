import {Test} from "@nestjs/testing";
import {AppModule} from "../../../app.module";
import {NestApplication} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";
import dbCleaner from '../../common/utils/database_cleaner'
import * as request from 'supertest';
import {AllSeed} from "../../../seed/all.seed";
import {SeedModule} from "../../../seed/seed.module";


describe('Health', () => {
    let app: NestApplication;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({imports: [AppModule, SeedModule]}).compile()
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        );
        await app.init();
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