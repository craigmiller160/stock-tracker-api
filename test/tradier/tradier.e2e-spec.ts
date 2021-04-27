import { HttpService, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import MockAdapter from 'axios-mock-adapter';
import axios, { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import quotes from './__data__/quotes.json';

const mockApi = new MockAdapter(axios);

const createResponse = (data: any): AxiosResponse => ({
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

		mockApi.reset();
	});

	it('GET /tradier/quote/:symbol', () => {
		mockApi
			.onGet('https://sandbox.tradier.com/v1/markets/quotes?symbols=AAPL')
			.reply(200, 'Success');
		const spy = jest.spyOn(httpService, 'get');
		spy.mockImplementationOnce(() => of(createResponse(quotes)));

		return request(app.getHttpServer())
			.get('/tradier/quote/AAPL')
			.expect(200)
			.expect(quotes.quotes.quote);
	});

	it('GET /tradier/quote/history/:symbol/:date', () => {
		throw new Error();
	});

	it('GET /tradier/today/:symbol', () => {
		throw new Error();
	});
});
