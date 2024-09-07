import {NestApplication} from "@nestjs/core";
import {TestUtils} from "../../infrastructure/test-utils/init-test-app";
import {BscClientFactory} from "../../infrastructure/services/chain-manager/clients/bsc/bsc-client";
import {PaymentMock} from "../../infrastructure/mock/entities/payment.mock";
import {PaymentUsecase} from "../payment/payment.usecase";
import {SettlementUsecase} from "./settlement.usecase";
import {SettlementMock} from "../../infrastructure/mock/entities/settlement.mock";
import {InvoiceRepository} from "../../infrastructure/repositories/providers/invoice.repository";

describe('Settlement Usecase', () => {
    let app: NestApplication;
    let testUtils: TestUtils;
    let bscClientFactory: BscClientFactory
    let paymentUsecase: PaymentUsecase
    let paymentMock: PaymentMock
    let settlementUsecase: SettlementUsecase
    let settlementMock: SettlementMock
    beforeAll(async () => {
        testUtils = new TestUtils('payment_usecase')
        app = await testUtils.initTestApp()
        bscClientFactory = app.get(BscClientFactory)
        paymentUsecase = app.get(PaymentUsecase)
        paymentMock = app.get(PaymentMock)
        settlementUsecase = app.get(SettlementUsecase)
        settlementMock = app.get(SettlementMock)
    })
    beforeEach(async () => {
    })
    it('should settle an invoice', async () => {
        const {payment, shopWalletAddress} = await settlementMock.prepareDependencies()
        await paymentUsecase.updatePaymentTxs(payment.id)
        const result = await settlementUsecase.createSettlement(payment.invoiceId)
        expect(result.status).toBe('DONE')
        expect(result.shopWalletAddressId).toBe(shopWalletAddress.id)
        const invoice = await app.get(InvoiceRepository).findById(payment.invoiceId)
        expect(invoice.status).toBe('SETTLED')
    })
    afterEach(async () => {
        await testUtils.clearDb()
    })
    afterAll(async () => {
        await app.close()
    })
})
