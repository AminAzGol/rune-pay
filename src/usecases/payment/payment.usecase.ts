import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {PaymentRepository} from "../../infrastructure/repositories/providers/payment.repository";
import {PaymentM} from "../../domain/model/payment";
import {BaseM} from "../../domain/model/base";
import {InvoiceUsecase} from "../invoice/invoice.usecase";

type PaymentCreateType = Omit<Omit<PaymentM, keyof BaseM>, 'shopId'>

@Injectable()
export class PaymentUsecase extends BaseUsecase<PaymentRepository, PaymentM> {

    constructor(repository: PaymentRepository, private readonly invoiceUsecase: InvoiceUsecase) {
        super(repository);
    }

    async create(input: PaymentCreateType): Promise<PaymentM> {
        const invoice = await this.invoiceUsecase.readById(input.invoiceId)
        return await this.repository.insert({...input, shopId: invoice.shopId})
    }
}