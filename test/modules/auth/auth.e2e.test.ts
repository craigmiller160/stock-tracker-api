import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestingApp } from '../../testutils/e2e/createTestingApp';
import { MOCK_TOKEN_DETAILS } from '../../testutils/mocks/MockTokenDetails';

describe('AuthController (e2e)', () => {
	let app: INestApplication;
	let signedToken: string;

	beforeEach(async () => {
		({ app, signedToken } = await createTestingApp());
		await app.init();
	});

	it('getUserDetails', () => {
		return request(app.getHttpServer())
			.get('/oauth/user')
			.set('Authorization', `Bearer ${signedToken}`)
			.expect(200, MOCK_TOKEN_DETAILS);
	});

	it('login', () => {
		throw new Error();
	});

	it('login without origin header', () => {
		return request(app.getHttpServer())
			.post('/oauth/authcode/login')
			.expect(400, {
				statusCode: 400,
				message: 'Missing origin header on request'
			});
	});

	it('code', () => {
		throw new Error();
	});

	it('logout', () => {
		throw new Error();
	});
});
