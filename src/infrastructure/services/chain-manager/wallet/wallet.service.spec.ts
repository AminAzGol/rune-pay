import {NestApplication} from "@nestjs/core";
import {TestUtils} from "../../../test-utils/init-test-app";
import {WalletService} from "./wallet.service";

describe('WalletService', () => {
    let app: NestApplication;
    let testUtils: TestUtils;
    let walletService: WalletService
    beforeAll(async () => {
        testUtils = new TestUtils('wallet_service')
        app = await testUtils.initTestApp()
        walletService = app.get(WalletService)
    })
    beforeEach(async () => {
    })
    it('can generate a keystore', async () => {
        const keystore = await walletService.generateKeystore()
        expect(keystore.crypto.cipher).toBeDefined()
    })
})
