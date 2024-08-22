import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {AcquisitionMock} from "../../mock/acquisition.mock";
import {AcquisitionStateEnum} from "../../../domain/enum/acquisition-state.enum";


describe('Acquisition', () => {
    let app: NestApplication;
    let acquisitionMock: AcquisitionMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('acquisition')
        app = await testUtils.initTestApp()
        acquisitionMock = app.get(AcquisitionMock)
    })
    beforeEach(async () => {
    })
    describe('POST /acquisition', () => {
        xit('should return 200', async () => {
            const acquisition = await acquisitionMock.getSample(0)
            const {payment, addressAsset} = await acquisitionMock.prepareDependencies()
            acquisition.paymentId = payment.id
            acquisition.addressAssetId = addressAsset.id
            const res = await request(app.getHttpServer()).post('/acquisition').send(acquisition)
            expect(res.status).toBe(201);

        })
    })
    describe('GET /acquisition', () => {
        it('should return 200', async () => {
            const acquisition = await acquisitionMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/acquisition/' + acquisition.id).send().expect(200);

        })
    })
    describe('PUT /acquisition', () => {
        it('should return 200', async () => {
            const acquisition = await acquisitionMock.createMock(0)
            const fieldsToUpdate = {
                state: AcquisitionStateEnum.DONE
            }
            const res = await request(app.getHttpServer()).put('/acquisition/' + acquisition.id).send(fieldsToUpdate).expect(200);
        })
    })

    describe('DELETE /acquisition', () => {
        it('should return 200', async () => {
            const acquisition = await acquisitionMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/acquisition/' + acquisition.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
