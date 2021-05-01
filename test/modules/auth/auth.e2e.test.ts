import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { INestApplication, OnModuleInit } from '@nestjs/common';
import request, { Response } from 'supertest';
import atob from 'atob';
import { JwkService } from '../../../src/modules/auth/jwk.service';
import { JwtService } from '@nestjs/jwt';

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

describe('AuthController (e2e)', () => {
	let app: INestApplication;
	let signedToken: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		})
			.overrideProvider(JwkService)
			.useClass(MockJwkService)
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
			.
			.expect(200, 'TODO');
	});
});