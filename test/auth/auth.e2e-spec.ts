import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { User } from '../../src/user/model/user';

interface AuthPayload {
	userName: string;
	password: string;
}

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('POST /auth/login (bad credentials)', () => {
		const payload: AuthPayload = {
			userName: 'abc',
			password: 'def'
		};
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(payload)
			.expect(401);
	});

	it('POST /auth/login (good credentials)', () => {
		const payload: AuthPayload = {
			userName: 'john',
			password: 'changeme'
		};
		const expected: User = {
			userId: 1,
			userName: 'john'
		};
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(payload)
			.expect(200, expected);
	});
});
