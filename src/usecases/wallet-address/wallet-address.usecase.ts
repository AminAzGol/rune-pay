import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {WalletAddressRepository} from "../../infrastructure/repositories/providers/wallet-address.repository";
import {WalletAddressM} from "../../domain/model/wallet-address";

@Injectable()
export class WalletAddressUsecase extends BaseUsecase<WalletAddressRepository, WalletAddressM> {

    constructor(repository: WalletAddressRepository) {
        super(repository);
    }
}