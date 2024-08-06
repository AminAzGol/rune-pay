import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {WalletAddressMock} from "../../mock/wallet-address.mock";


describe('WalletAddress', () => {
    let app: NestApplication;
    let walletAddressMock: WalletAddressMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('wallet_address')
        app = await testUtils.initTestApp()
        walletAddressMock = app.get(WalletAddressMock)
    })
    beforeEach(async () => {
    })
    describe('POST /wallet-address', () => {
        it('should return 200', async () => {
            const walletAddress = await walletAddressMock.getSample(0)
            const {wallet, chain} = await walletAddressMock.prepareDependencies()
            const res = await request(app.getHttpServer()).post('/wallet-address').send({
                ...walletAddress,
                walletId: wallet.id,
                chainId: chain.id
            })
            expect(res.status).toBe(201);

        })
    })
    describe('GET /wallet-address', () => {
        it('should return 200', async () => {
            const walletAddress = await walletAddressMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/wallet-address/' + walletAddress.id).send().expect(200);

        })
    })
    describe('DELETE /wallet-address', () => {
        it('should return 200', async () => {
            const walletAddress = await walletAddressMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/wallet-address/' + walletAddress.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
