import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {WalletMock} from "../../mock/entities/wallet.mock";


describe('Wallet', () => {
    let app: NestApplication;
    let walletMock: WalletMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('wallet')
        app = await testUtils.initTestApp()
        walletMock = app.get(WalletMock)
    })
    beforeEach(async () => {
    })
    describe('GET /wallet', () => {
        it('should return 200', async () => {
            const wallet = await walletMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/wallet/' + wallet.id).send().expect(200);

        })
    })

    describe('DELETE /wallet', () => {
        it('should return 200', async () => {
            const wallet = await walletMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/wallet/' + wallet.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
