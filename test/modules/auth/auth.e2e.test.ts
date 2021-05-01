import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
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

	it('getUserDetails', () => {
		return request(app.getHttpServer())
			.get('/auth/details')
			.expect(200, 'TODO');
	});
});
