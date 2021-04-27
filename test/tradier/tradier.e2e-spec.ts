import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

describe('TradierController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('GET /tradier/quote/:symbol', () => {
		throw new Error();
	});

	it('GET /tradier/quote/history/:symbol/:date', () => {
		throw new Error();
	});

	it('GET /tradier/today/:symbol', () => {
		throw new Error();
	});
});
