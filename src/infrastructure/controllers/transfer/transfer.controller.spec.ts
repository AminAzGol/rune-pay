import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {TransferMock} from "../../mock/entities/transfer.mock";


describe('Transfer', () => {
    let app: NestApplication;
    let transferMock: TransferMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('transfer')
        app = await testUtils.initTestApp()
        transferMock = app.get(TransferMock)
    })
    beforeEach(async () => {
    })
    describe('POST /transfer', () => {
        it('should return 200', async () => {
            const {settlement, shopWalletAddress} = await transferMock.prepareDependencies()
            const res = await request(app.getHttpServer()).post('/transfer').send({
                settlementId: settlement.id,
                shopWalletAddressId: shopWalletAddress.id,
            })
            expect(res.status).toBe(201);

        })
    })
    describe('GET /transfer', () => {
        it('should return 200', async () => {
            const transfer = await transferMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/transfer/' + transfer.id).send().expect(200);

        })
    })
    describe('DELETE /transfer', () => {
        it('should return 200', async () => {
            const transfer = await transferMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/transfer/' + transfer.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
