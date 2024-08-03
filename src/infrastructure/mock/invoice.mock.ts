import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {InvoiceM} from "../../domain/model/invoice";
import {InvoiceRepository} from "../repositories/providers/invoice.repository";
import {InvoiceStatusEnum} from "../../domain/enum/invoice-status.enum";
import {OrderMock} from "./order.mock";
import {OrderM} from "../../domain/model/order";
import {CurrencyM} from "../../domain/model/currency";
import {AddressAssetM} from "../../domain/model/address-asset";
import {CurrencyMock} from "./currency.mock";


@Injectable()
export class InvoiceMock extends BaseMock<InvoiceM> {

    constructor(repository: InvoiceRepository, private readonly orderMock: OrderMock, private readonly currencyMock: CurrencyMock) {
        const samples = [
            {
                amount: 1000,
                status: InvoiceStatusEnum.PENDING
            }
        ]
        super(repository, samples);
    }

    async prepareDependencies(except?: {
        order?: boolean,
        currency: boolean,
        addressAsset: boolean
    }) {
        const result = {
            order: undefined as OrderM,
            currency: undefined as CurrencyM,
            addressAsset: undefined as AddressAssetM
        }
        if (!except?.order) {
            result.order = await this.orderMock.createMock(0)
        }
        if (!except?.currency) {
            result.currency = await this.currencyMock.createMock(0)
        }
        if (!except.addressAsset) {
            result.addressAsset = undefined //FIXME:
        }
    }

    async createMock(index: number): Promise<InvoiceM> {
        return undefined as InvoiceM
    }
}