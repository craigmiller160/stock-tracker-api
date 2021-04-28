import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';
import request, { Response } from 'supertest';
import atob from 'atob';

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
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(payload)
			.expect(201)
			.then((res: Response) => {
				const accessToken: string = res.body.access_token;
				expect(accessToken).not.toBeUndefined();

				const middlePart = accessToken.split('.')[1];
				const result = JSON.parse(atob(middlePart));
				expect(result).toEqual({
					userName: 'john',
					sub: 1,
					iat: expect.any(Number),
					exp: expect.any(Number)
				});
			});
	});
});
