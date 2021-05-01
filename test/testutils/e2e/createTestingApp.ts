import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { JwkService } from '../../../src/modules/auth/jwk.service';
import { MockJwkService } from '../mocks/MockJwkService';
import { ConfigService } from '@nestjs/config';
import {
	MOCK_CLIENT_KEY,
	MOCK_CLIENT_NAME,
	MockConfigService
} from '../mocks/MockConfigService';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const tokenKey = 'TokenKey';
const token = {
	clientKey: MOCK_CLIENT_KEY,
	clientName: MOCK_CLIENT_NAME
};

interface TestingApp {
	app: INestApplication;
	signedToken: string;
}

export const createTestingApp = async (): Promise<TestingApp> => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule]
	})
		.overrideProvider(JwkService)
		.useClass(MockJwkService)
		.overrideProvider(ConfigService)
		.useClass(MockConfigService)
		.compile();

	const app: INestApplication = moduleFixture.createNestApplication();

	const jwkService = app.get<JwkService>(JwkService);
	jwkService.key.next(tokenKey);

	const jwtService = app.get<JwtService>(JwtService);
	const signedToken: string = jwtService.sign(token, {
		secret: tokenKey
	});

	return {
		app,
		signedToken
	};
};
