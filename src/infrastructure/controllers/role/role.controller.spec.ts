import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {RoleMock} from "../../mock/role.mock";
import {RoleEnum} from "../../../domain/enum/role.enum";


describe('Role', () => {
    let app: NestApplication;
    let roleMock: RoleMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('role')
        app = await testUtils.initTestApp()
        roleMock = app.get(RoleMock)
    })
    beforeEach(async () => {
    })
    describe('POST /role', () => {
        it('should return 200', async () => {
            const role = await roleMock.getSample(0)
            const {shop, user} = await roleMock.prepareDependencies()
            role.shopId = shop.id
            role.userId = user.id
            const res = await request(app.getHttpServer()).post('/role').send(role)
            expect(res.status).toBe(201);
        })
    })
    describe('GET /role', () => {
        it('should return 200', async () => {
            const role = await roleMock.createMock(0)
            const res = await request(app.getHttpServer()).get('/role/' + role.id).send().expect(200);
        })
    })
    describe('PUT /role', () => {
        it('should return 200', async () => {
            const role = await roleMock.createMock(0)
            const fieldsToUpdate = {role: RoleEnum.SHOP_OWNER}
            const res = await request(app.getHttpServer()).put('/role/' + role.id).send(fieldsToUpdate).expect(200);
        })
    })

    describe('DELETE /role', () => {
        it('should return 200', async () => {
            const role = await roleMock.createMock(0)
            const res = await request(app.getHttpServer()).delete('/role/' + role.id).send().expect(200);
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})
