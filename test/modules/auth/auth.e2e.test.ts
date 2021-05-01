import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { INestApplication, OnModuleInit } from '@nestjs/common';
import request from 'supertest';
import { JwkService } from '../../../src/modules/auth/jwk.service';
import { JwtService } from '@nestjs/jwt';

// TODO make the token settings less tied to .env
const tokenKey = 'TokenKey';
const token = {
	clientKey: '96fb73dc-ae88-4056-a349-6e7488f7f6c4',
	clientName: 'stock-tracker-api'
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
			.set('Authorization', `Bearer ${signedToken}`)
			.expect(200, 'TODO');
	});
});
