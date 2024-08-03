import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {InvoiceM} from "../../../domain/model/invoice";
import {Repository} from "typeorm";
import {InvoiceEntity} from "../../entities/invoice.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class InvoiceRepository extends BaseRepository<InvoiceM> {

    constructor(@InjectRepository(InvoiceEntity) entityRepository: Repository<InvoiceEntity>) {
        super(entityRepository);
    }
}