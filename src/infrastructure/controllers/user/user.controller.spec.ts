import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {UserMock} from "../../mock/user.mock";


describe('User', () => {
    let app: NestApplication;
    let userMock: UserMock;
    let testUtils: TestUtils;
    beforeAll(async () => {
        testUtils = new TestUtils('user')
        app = await testUtils.initTestApp()
        userMock = app.get(UserMock)
    })
    beforeEach(async () => {
    })
    describe('POST /user', () => {
        it('should return 200', async () => {
            const user = await userMock.getSample(1)
            const res = await request(app.getHttpServer()).post('/user').send(user).expect(201);
            expect(res.body.email).toBe(user.email)
            expect(res.body.password).toBe(undefined)
        })
    })
    describe('GET /user', () => {
        it('should return 200', async () => {
            const user = await userMock.createMock(1)
            const res = await request(app.getHttpServer()).get('/user/' + user.id).send().expect(200);
            expect(res.body.email).toBe(user.email)
            expect(res.body.password).toBe(undefined)
        })
    })
    describe('PUT /user', () => {
        it('should return 200', async () => {
            const user = await userMock.createMock(1);
            const email = 'jeff.bezos@gmail.com'
            const res = await request(app.getHttpServer()).put('/user/' + user.id).send({email}).expect(200);
            expect(res.body.email).toBe(email)
            expect(res.body.password).toBe(undefined)
        })
    })

    describe('DELETE /user', () => {
        it('should return 200', async () => {
            const user = await userMock.createMock(1)
            const res = await request(app.getHttpServer()).delete('/user/' + user.id).send().expect(200);
            expect(res.body.email).toBe(undefined)
            expect(res.body.password).toBe(undefined)
        })
    })

    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})