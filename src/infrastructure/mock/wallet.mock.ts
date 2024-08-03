import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {WalletM} from "../../domain/model/wallet";
import {WalletRepository} from "../repositories/providers/wallet.repository";


@Injectable()
export class WalletMock extends BaseMock<WalletM> {

    constructor(repository: WalletRepository) {
        const samples = [
            {
                keystore: '{"crypto": {"cipher": "aes-128-ctr", "ciphertext": "7b7e4bd2fa7885265a932e05baa6ec2a8ef9880df04310bb1756efde68fa8b87b4cf9d26eff325a158c3541d133ca5cf8a489674b016b3248e635b80aa32dd2141968aab31eceb36f6f9b808330f7bd9072c0caef6", "cipherparams": {"iv": "7d0422c18af0d845c32afb22715bf172"}, "kdf": "pbkdf2", "kdfparams": {"prf": "hmac-sha256", "dklen": new NumberInt("32"), "salt": "9691e0e79c8c72213fa6f674c803ccf0bd84a399301acf65f2024375dc5a8c8f", "c": new NumberInt("262144")}, "mac": "a0267be2fd2959be0a3f94cb56c1e86f0847da7de0b5f1c6c1df28541a295daa"}, "id": "4cd1fd53-60ad-4907-87dc-6a5c6c3dde0b", "version": new NumberInt("1"), "meta": "xchain-keystore"}'
            }
        ]
        super(repository, samples);
    }
}