import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {SettlementMock} from "../../mock/entities/settlement.mock";
import {SettlementStatusEnum} from "../../../domain/enum/settlement-status.enum";


describe('Settlement', () => {
    let app: NestApplication;
    let settlementMock: SettlementMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('settlement')
        app = await testUtils.initTestApp()
        settlementMock = app.get(SettlementMock)
    })
    beforeEach(async () => {
    })
    describe('POST /settlement', () => {
        it('should return 200', async () => {
            const {payment1} = await settlementMock.prepareDependencies()
            const input = {
                paymentIds: [payment1.id],
                status: SettlementStatusEnum.PENDING
            }
            const res = await request(app.getHttpServer()).post('/settlement').send(input)
            expect(res.status).toBe(201);
        })
    })
    describe('GET /settlement', () => {
        it('should return 200', async () => {
            const settlement = await settlementMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/settlement/' + settlement.id).send().expect(200);

        })
    })
    describe('PUT /settlement', () => {
        it('should return 200', async () => {
            const settlement = await settlementMock.createMock(0)
            const fieldsToUpdate = {status: SettlementStatusEnum.FAILED}
            const res = await request(app.getHttpServer()).put('/settlement/' + settlement.id).send(fieldsToUpdate).expect(200);
        })
    })

    describe('DELETE /settlement', () => {
        it('should return 200', async () => {
            const settlement = await settlementMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/settlement/' + settlement.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
