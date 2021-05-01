import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { INestApplication, OnModuleInit } from '@nestjs/common';
import request from 'supertest';
import { JwkService } from '../../../src/modules/auth/jwk.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService, NoInferType } from '@nestjs/config';
import { CLIENT_KEY, CLIENT_NAME } from '../../../src/config/keys';

const tokenKey = 'TokenKey';
const token = {
	clientKey: 'clientKey',
	clientName: 'clientName'
};

class MockJwkService extends JwkService implements OnModuleInit {
	onModuleInit(): void {
		// Do nothing
	}
}

class MockConfigService extends ConfigService {
	private config = {
		[CLIENT_KEY]: 'clientKey',
		[CLIENT_NAME]: 'clientName'
	};

	get<T = any>(
		propertyPath: string,
		defaultValue: NoInferType<T> = undefined
	): T | undefined {
		const value = this.config[propertyPath];
		if (value) {
			return value;
		}
		return defaultValue;
	}
}

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
