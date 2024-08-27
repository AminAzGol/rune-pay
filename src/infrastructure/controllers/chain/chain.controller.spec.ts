import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {ChainMock} from "../../mock/entities/chain.mock";


describe('Chain', () => {
    let app: NestApplication;
    let chainMock: ChainMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('chain')
        app = await testUtils.initTestApp()
        chainMock = app.get(ChainMock)
    })
    beforeEach(async () => {
    })
    describe('POST /chain', () => {
        it('should return 200', async () => {
            const chain = await chainMock.getSample(0)
            const res = await request(app.getHttpServer()).post('/chain').send(chain)
            expect(res.status).toBe(201);

        })
    })
    describe('GET /chain', () => {
        it('should return 200', async () => {
            const chain = await chainMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/chain/' + chain.id).send().expect(200);

        })
    })
    // describe('PUT /chain', () => {
    //     it('should return 200', async () => {
    //         const chain = await chainMock.createMock(0)
    //         const fieldsToUpdate = {
    //             minConfirmations: 2
    //         }
    //         const res = await request(app.getHttpServer()).put('/chain/' + chain.id).send(fieldsToUpdate).expect(200);
    //         expect(res.body.minConfirmations).toBe(2)
    //     })
    // })

    describe('DELETE /chain', () => {
        it('should return 200', async () => {
            const chain = await chainMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/chain/' + chain.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
