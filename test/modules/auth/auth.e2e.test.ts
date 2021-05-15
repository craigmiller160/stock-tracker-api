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
});
