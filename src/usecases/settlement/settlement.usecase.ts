import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {SettlementRepository} from "../../infrastructure/repositories/providers/settlement.repository";
import {SettlementM} from "../../domain/model/settlement";
import {SettlementStatusEnum} from "../../domain/enum/settlement-status.enum";
import {PaymentStatusEnum} from "../../domain/enum/payment-status.enum";
import {ResourceException, ResourcePreconditionFailed} from "../../domain/exceptions/resource-exceptions";
import {PaymentM} from "../../domain/model/payment";
import {PaymentRepository} from "../../infrastructure/repositories/providers/payment.repository";
import {BaseM} from "../../domain/model/base";

@Injectable()
export class SettlementUsecase extends BaseUsecase<SettlementRepository, SettlementM> {

    constructor(repository: SettlementRepository, private readonly paymentRepository: PaymentRepository) {
        super(repository);
    }

    async create(input: Omit<SettlementM, keyof BaseM>): Promise<SettlementM> {
        throw new Error('not available')
    }

    async createSettlement(input: { paymentIds: number[], status: SettlementStatusEnum }): Promise<SettlementM> {
        const payments = await this.paymentRepository.findManyByIds(input.paymentIds)
        const paymentIds = payments.map(o => o.id)
        this.checkAllPaymentsArePaid(payments)
        const shopId = this.checkAllAreTheSame(payments.map(o => o.shopId), new ResourcePreconditionFailed('Payment', {paymentIds}, 'all must have the same shopId'))
        const addressAssetIds = payments.map(o => this.getPaymentAddressAssetId(o))
        const addressAssetId = this.checkAllAreTheSame(addressAssetIds, new ResourcePreconditionFailed('Payment', {paymentIds}, 'all payments must have the same address asset'))
        const paymentAssetId = this.checkAllAreTheSame(payments.map(o => o.payAssetId), new ResourcePreconditionFailed('Payment', {paymentIds}, 'all payments must have the same pay asset'))
        const totalPaymentsAmount = payments.reduce((a, b) => a + b.payAmount, 0)
        return await this.repository.insert({
            shopId,
            addressAssetId,
            paymentAssetId,
            totalPaymentsAmount,
            settlementAssetId: paymentAssetId,
            settlementAmount: totalPaymentsAmount,
            status: input.status,
            payments
        })
    }

    private getPaymentAddressAssetId(payment) {
        if (payment.acquisitions?.length !== 1) {
            throw new ResourcePreconditionFailed('Payment', {paymentId: payment.id}, 'payment must have exactly one acquired address ')
        }
        return payment.acquisitions[0].addressAssetId
    }

    private checkAllPaymentsArePaid(payments: PaymentM[]) {
        const error = new ResourcePreconditionFailed('Payment', {paymentIds: payments.map(o => o.id)}, 'all payments must be paid')
        const status = payments[0].status
        if (status !== PaymentStatusEnum.PAID) throw error
        return this.checkAllAreTheSame(payments.map(o => o.status), error)
    }

    private checkAllAreTheSame<T>(list: T[], error: ResourceException) {
        const firstOne = list[0]
        for (const item of list) {
            if (item !== firstOne) {
                throw error
            }
        }
        return firstOne
    }

}