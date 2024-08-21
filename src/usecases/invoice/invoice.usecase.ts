import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {InvoiceRepository} from "../../infrastructure/repositories/providers/invoice.repository";
import {InvoiceM} from "../../domain/model/invoice";
import {ShopM} from "../../domain/model/shop";
import {CreateInvoiceDto} from "../../infrastructure/controllers/invoice/invoice.dto";
import {InvoiceStatusEnum} from "../../domain/enum/invoice-status.enum";
import {DateUtils} from "../../infrastructure/common/utils/date.utils";
import {PageOptionsInterface} from "../../domain/common/page-options.interface";
import {PaginatedItems} from "../../domain/common/paginated-items";

@Injectable()
export class InvoiceUsecase extends BaseUsecase<InvoiceRepository, InvoiceM> {

    constructor(repository: InvoiceRepository) {
        super(repository);
    }

    async createInvoice(shop: ShopM, input: CreateInvoiceDto) {
        return await this.repository.insert({
            ...input,
            shopId: shop.id,
            status: InvoiceStatusEnum.PENDING,
            expiresAt: DateUtils.getNextXHours(2)
        })
    }

    async readShopInvoices(shop: ShopM, pageOptions: PageOptionsInterface): Promise<PaginatedItems<InvoiceM>> {
        return await this.repository.findAllPaginated(
            pageOptions,
            {shopId: shop.id}
        )
    }
}