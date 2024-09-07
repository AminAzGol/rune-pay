import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {SettlementRepository} from "../../infrastructure/repositories/providers/settlement.repository";
import {SettlementM} from "../../domain/model/settlement";
import {PaymentStatusEnum} from "../../domain/enum/payment-status.enum";
import {
    ResourceConflictException,
    ResourceException,
    ResourcePreconditionFailed
} from "../../domain/exceptions/resource-exceptions";
import {PaymentM} from "../../domain/model/payment";
import {BaseM} from "../../domain/model/base";
import {PaymentUsecase} from "../payment/payment.usecase";
import {ShopWalletAddressUsecase} from "../shop-wallet-address/shop-wallet-address.usecase";
import {SettlementStatusEnum} from "../../domain/enum/settlement-status.enum";
import {SettlementTypeEnum} from "../../domain/enum/settlement-type.enum";
import {ShopWalletAddressM} from "../../domain/model/shop-wallet-address";
import {ChainManagerService} from "../../infrastructure/services/chain-manager/chain-manager.service";
import {AcquisitionUsecase} from "../acquisition/acquisition.usecase";
import {WalletUsecase} from "../wallet/wallet.usecase";
import {AssetUsecase} from "../asset/asset.usecase";
import {TransferUsecase} from "../transfer/transfer.usecase";
import {TransferStatusEnum} from "../../domain/enum/transfer-status.enum";
import {InvoiceUsecase} from "../invoice/invoice.usecase";
import {InvoiceStatusEnum} from "../../domain/enum/invoice-status.enum";

@Injectable()
export class SettlementUsecase extends BaseUsecase<SettlementRepository, SettlementM> {

    constructor(
        repository: SettlementRepository,
        private readonly paymentUsecase: PaymentUsecase,
        private readonly shopWalletAddressUsecase: ShopWalletAddressUsecase,
        private readonly chainManagerService: ChainManagerService,
        private readonly acquisitionUsecase: AcquisitionUsecase,
        private readonly walletUsecase: WalletUsecase,
        private readonly assetUsecase: AssetUsecase,
        private readonly transferUsecase: TransferUsecase,
        private readonly invoiceUsecase: InvoiceUsecase
    ) {
        super(repository);
    }

    async create(input: Omit<SettlementM, keyof BaseM>): Promise<SettlementM> {
        throw new Error('not available')
    }

    async createSettlement(invoiceId: number): Promise<SettlementM> {
        const payments = await this.paymentUsecase.readByInvoiceIdAndStatus(invoiceId, PaymentStatusEnum.PAID)
        if (payments.length === 0) {
            throw new ResourcePreconditionFailed('Payment', {
                invoiceId,
                status: PaymentStatusEnum.PAID
            }, 'this invoice does not have a paid payment')
        } else if (payments.length > 1) {
            throw new ResourceConflictException('Payment', {
                invoiceId,
                status: PaymentStatusEnum.PAID
            }, 'invoice has more than one paid payments')
        }
        const payment = payments[0]
        const existing = await this.repository.findAll({paymentId: payment.id})
        if (existing.length > 0) {
            throw new ResourceConflictException('Settlement', {paymentId: payment.id}, 'a settlement for this payment already exists')
        }
        let settlement: SettlementM
        let status: SettlementStatusEnum
        let type: SettlementTypeEnum = SettlementTypeEnum.SWAP
        let shopWalletAddress: ShopWalletAddressM
        try {
            shopWalletAddress = await this.shopWalletAddressUsecase.readByShopId(payment.shopId)
            if (shopWalletAddress.assetId !== payment.payAssetId) {
                status = SettlementStatusEnum.FAILED
            } else {
                status = SettlementStatusEnum.PENDING
                type = SettlementTypeEnum.TRANSFER
            }
        } catch (error) {
            status = SettlementStatusEnum.FAILED
        } finally {
            settlement = await this.repository.insert({
                shopId: payment.shopId,
                invoiceId: payment.invoiceId,
                paymentId: payment.id,
                acquisitionId: payment.acquisitionId,
                paymentAssetId: payment.payAssetId,
                settlementAssetId: shopWalletAddress.assetId,
                paymentAmount: payment.payAmount,
                shopWalletAddressId: shopWalletAddress.id,
                status,
                type
            })
        }

        if (type === SettlementTypeEnum.TRANSFER) {
            const transfer = await this.transferUsecase.performTransfer(settlement)
            if (transfer.status === TransferStatusEnum.DONE) {
                const {status: settlementStatus} = await super.update(settlement.id, {status: SettlementStatusEnum.DONE})
                settlement.status = settlementStatus
                await this.invoiceUsecase.update(settlement.invoiceId, {status: InvoiceStatusEnum.SETTLED})
            }
        }

        return settlement
    }


    private getPaymentAddressAssetId(payment) {
        if (!payment.acquisition) {
            throw new ResourcePreconditionFailed('Payment', {paymentId: payment.id}, 'payment must have exactly one acquired address ')
        }
        return payment.acquisition.addressAssetId
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