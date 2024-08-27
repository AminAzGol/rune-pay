import {Injectable} from "@nestjs/common";
import {BaseMock} from "./base.mock";
import {WalletM} from "../../../domain/model/wallet";
import {WalletRepository} from "../../repositories/providers/wallet.repository";


@Injectable()
export class WalletMock extends BaseMock<WalletM> {

    constructor(repository: WalletRepository) {
        const samples = [
            {
                keystore: {
                    "crypto": {
                        "cipher": "aes-128-ctr",
                        "ciphertext": "07ea8db9f9dfdb119d81d1a15cb67635527997497ffd768af7e24b75febdbbca726cf4c06cf026a9cf69e16cf37009d4db8c5d43115ce8cdf27078e38d9d6c2e5ea8d3a6d1ecfd10f60b4e",
                        "cipherparams": {"iv": "22ab01f5a1cf7875a91fa9a43e982b38"},
                        "kdf": "pbkdf2",
                        "kdfparams": {
                            "prf": "hmac-sha256",
                            "dklen": 32,
                            "salt": "6839e2a0129c8611cca07d139748ef3fe7ebf90a6c8a9bd6cd80193a2a381c9e",
                            "c": 262144
                        },
                        "mac": "d7810ef57cfab2d86f4ea88ba2e029172df5323802ceac1bcd840fbade23a6b8"
                    }, "id": "c8d9449f-4ee3-4688-b578-91b699200360", "version": 1, "meta": "xchain-keystore"
                }
            }
        ]
        super(repository, samples);
    }
}