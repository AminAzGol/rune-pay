import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {TransactionMock} from "../../mock/entities/transaction.mock";


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
    describe('GET /transaction', () => {
        it('should return 200', async () => {
            const transaction = await transactionMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/transaction/' + transaction.id).send().expect(200);
        })
    })
    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
