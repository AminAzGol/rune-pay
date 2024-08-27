import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {AddressAssetMock} from "../../mock/entities/address-asset.mock";


describe('AddressAsset', () => {
    let app: NestApplication;
    let addressAssetMock: AddressAssetMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('address_asset')
        app = await testUtils.initTestApp()
        addressAssetMock = app.get(AddressAssetMock)
    })
    beforeEach(async () => {
    })
    describe('POST /address-asset', () => {
        it('should return 200', async () => {
            const {asset, walletAddress} = await addressAssetMock.prepareDependencies()
            const res = await request(app.getHttpServer()).post('/address-asset').send({
                assetId: asset.id,
                addressId: walletAddress.id
            })
            expect(res.status).toBe(201);

        })
    })
    describe('GET /address-asset', () => {
        it('should return 200', async () => {
            const addressAsset = await addressAssetMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/address-asset/' + addressAsset.id).send().expect(200);

        })
    })

    describe('DELETE /address-asset', () => {
        it('should return 200', async () => {
            const addressAsset = await addressAssetMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/address-asset/' + addressAsset.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
