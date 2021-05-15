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
		return request(app.getHttpServer())
			.post('/oauth/authcode/login')
			.set('Origin', 'https://localhost:3000')
			.expect(200, {
				url: ''
			});
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

	it('code with wrong state', () => {
		throw new Error();
	});

	it('code with wrong origin', () => {
		throw new Error();
	});

	it('code with expired state', () => {
		throw new Error();
	});

	it('logout', () => {
		throw new Error();
	});
});
