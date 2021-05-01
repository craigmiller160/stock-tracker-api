import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { INestApplication, OnModuleInit } from '@nestjs/common';
import request, { Response } from 'supertest';
import atob from 'atob';
import { JwkService } from '../../../src/modules/auth/jwk.service';

class MockJwkService extends JwkService implements OnModuleInit {
	onModuleInit(): void {
		// Do nothing
	}
}

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		})
			.overrideProvider(JwkService)
			.useClass(MockJwkService)
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('getUserDetails', () => {
		return request(app.getHttpServer())
			.get('/auth/details')
			.expect(200, 'TODO');
	});
});
