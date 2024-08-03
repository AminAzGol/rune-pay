import {Injectable} from "@nestjs/common";
import {BaseUsecase} from "../base/base.usecase";
import {WalletRepository} from "../../infrastructure/repositories/providers/wallet.repository";
import {WalletM} from "../../domain/model/wallet";

@Injectable()
export class WalletUsecase extends BaseUsecase<WalletRepository, WalletM> {

    constructor(repository: WalletRepository) {
        super(repository);
    }
}