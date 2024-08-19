import {Injectable} from "@nestjs/common";
import {decryptFromKeystore, encryptToKeyStore, generatePhrase, validatePhrase} from "@xchainjs/xchain-crypto";
import {EnvironmentConfigService} from "../../../common/config/environment_config.service";

@Injectable()
export class WalletService {
    private readonly password: string

    constructor(private readonly environmentConfigService: EnvironmentConfigService) {
        const config = environmentConfigService.getWalletConfig()
        if (!config.password) {
            throw new Error("config wallet.password not set")
        }
        this.password = config.password
    }

    async generateKeystore() {
        const phrase = generatePhrase()
        const isCorrect = validatePhrase(phrase) //validate phrase if needed returns Boolean
        if (!isCorrect) {
            throw Error('failed to generate a valid phrase')
        }
        return await encryptToKeyStore(phrase, this.password)
    }

    async decryptExistingKeystore(keystore) {
        const phrase = await decryptFromKeystore(keystore, this.password)
        const isCorrect = validatePhrase(phrase) //validate phrase if needed returns Boolean
        if (!isCorrect) {
            throw Error('failed to decrypt to a valid phrase')
        }
        return phrase
    }
}