import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {InvoiceRepository} from "../../infrastructure/repositories/providers/invoice.repository";
import {InvoiceM} from "../../domain/model/invoice";

@Injectable()
export class InvoiceUsecase extends BaseUsecase<InvoiceRepository, InvoiceM> {

    constructor(repository: InvoiceRepository) {
        super(repository);
    }
}