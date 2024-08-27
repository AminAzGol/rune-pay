import {NestApplication} from "@nestjs/core";
import * as request from 'supertest';
import {TestUtils} from "../../test-utils/init-test-app";
import {UserMock} from "../../mock/entities/user.mock";
import {UserWithRawPassword} from "../../../domain/model/user";


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

    describe('POST /user/login', () => {
        it('should return 201', async () => {
            const sample = userMock.getSample(1) as UserWithRawPassword
            await userMock.createCustom(sample)
            const res = await request(app.getHttpServer()).post('/user/login').send({
                email: sample.email,
                password: sample.password
            })
            expect(res.status).toBe(201)
            expect(res.body.token).toBeDefined()
        })
        it('should return 401', async () => {
            const sample = userMock.getSample(1) as UserWithRawPassword
            await userMock.createCustom(sample)
            await request(app.getHttpServer()).post('/user/login').send({
                email: sample.email,
                password: 'xyz'
            }).expect(401)
            await request(app.getHttpServer()).post('/user/login').send({
                email: 'xyz',
                password: sample.password
            }).expect(401)

        })
    })
    afterEach(async () => {
        await testUtils.clearDb();
    });
    afterAll(async () => {
        await testUtils.destroyTestApp()
    })
})