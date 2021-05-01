import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { JwkService } from '../../../src/modules/auth/jwk.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
	MOCK_CLIENT_KEY,
	MOCK_CLIENT_NAME,
	MockConfigService
} from '../../testutils/mocks/MockConfigService';
import { MockJwkService } from '../../testutils/mocks/MockJwkService';

const tokenKey = 'TokenKey';
const token = {
	clientKey: MOCK_CLIENT_KEY,
	clientName: MOCK_CLIENT_NAME
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;
	let signedToken: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		})
			.overrideProvider(JwkService)
			.useClass(MockJwkService)
			.overrideProvider(ConfigService)
			.useClass(MockConfigService)
			.compile();

		app = moduleFixture.createNestApplication();

		const jwkService = app.get<JwkService>(JwkService);
		jwkService.key.next(tokenKey);

		const jwtService = app.get<JwtService>(JwtService);
		signedToken = jwtService.sign(token, {
			secret: tokenKey
		});

		await app.init();
	});

	it('getUserDetails', () => {
		return request(app.getHttpServer())
			.get('/auth/details')
			.set('Authorization', `Bearer ${signedToken}`)
			.expect(200, 'TODO');
	});
});
