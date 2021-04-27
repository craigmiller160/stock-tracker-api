import { HttpService, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import quotes from './__data__/quotes.json';

const createResponse = <T>(data: T): AxiosResponse<T> => ({
	data,
	headers: {},
	config: {},
	status: 200,
	statusText: 'OK'
});

describe('TradierController (e2e)', () => {
	let app: INestApplication;
	let httpService: HttpService;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		httpService = app.get<HttpService>(HttpService);
		await app.init();
	});

	it('GET /tradier/quote/:symbol', async () => {
		const spy = jest.spyOn(httpService, 'get');
		spy.mockImplementationOnce(() => of(createResponse(quotes)));

		await request(app.getHttpServer())
			.get('/tradier/quote/AAPL')
			.expect(200, quotes.quotes.quote);

		expect(spy).toHaveBeenCalledWith(
			'/markets/quotes?symbols=AAPL',
			expect.any(Object)
		);
	});

	it('GET /tradier/quote/history/:symbol/:date', () => {
		throw new Error();
	});

	it('GET /tradier/today/:symbol', () => {
		throw new Error();
	});
});
