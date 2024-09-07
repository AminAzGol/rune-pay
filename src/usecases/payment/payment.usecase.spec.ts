import {NestApplication} from "@nestjs/core";
import {TestUtils} from "../../infrastructure/test-utils/init-test-app";
import {BscClientFactory} from "../../infrastructure/services/chain-manager/clients/bsc/bsc-client";
import {PaymentUsecase} from "./payment.usecase";
import {PaymentMock} from "../../infrastructure/mock/entities/payment.mock";

describe('PaymentUseCase', () => {
    let app: NestApplication;
    let testUtils: TestUtils;
    let bscClientFactory: BscClientFactory
    let paymentUsecase: PaymentUsecase
    let paymentMock: PaymentMock
    beforeAll(async () => {
        testUtils = new TestUtils('payment_usecase')
        app = await testUtils.initTestApp()
        bscClientFactory = app.get(BscClientFactory)
        paymentUsecase = app.get(PaymentUsecase)
        paymentMock = app.get(PaymentMock)
    })
    beforeEach(async () => {
    })
    it('should update payment Txs', async () => {
        let payment = await paymentMock.createMock(0)
        await paymentUsecase.updatePaymentTxs(payment.id)
        let paymentAfterUpdate = await paymentUsecase.readById(payment.id)
        expect(paymentAfterUpdate.acquisition).toBeDefined()
        expect(paymentAfterUpdate.acquisition.txs).toHaveLength(1)
        expect(paymentAfterUpdate.acquisition.txs[0].associatedAssetId).toBe(payment.payAssetId)
    })
    afterEach(async () => {
        await testUtils.clearDb()
    })
    afterAll(async () => {
        await app.close()
    })
})