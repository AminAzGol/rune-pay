import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {TransactionMock} from "../../mock/transaction.mock";


describe('Transaction', () => {
    let app: NestApplication;
    let transactionMock: TransactionMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('transaction')
        app = await testUtils.initTestApp()
        transactionMock = app.get(TransactionMock)
    })
    beforeEach(async () => {
    })
    describe('POST /transaction', () => {
        it('should return 200', async () => {
            const transaction = await transactionMock.getSample(0)
            const {acquisition} = await transactionMock.prepareDependencies()
            transaction.acquisitionId = acquisition.id
            const res = await request(app.getHttpServer()).post('/transaction').send(transaction)
            expect(res.status).toBe(201);
        })
    })
    describe('GET /transaction', () => {
        it('should return 200', async () => {
            const transaction = await transactionMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/transaction/' + transaction.id).send().expect(200);

        })
    })
    describe('PUT /transaction', () => {
        it('should return 200', async () => {
            const transaction = await transactionMock.createMock(0)
            const fieldsToUpdate = {
                confirmations: 22,
            }
            const res = await request(app.getHttpServer()).put('/transaction/' + transaction.id).send(fieldsToUpdate).expect(200);
        })
    })

    describe('DELETE /transaction', () => {
        it('should return 200', async () => {
            const transaction = await transactionMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/transaction/' + transaction.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
