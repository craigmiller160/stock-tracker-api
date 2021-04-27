import { HttpService, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import quotes from './__data__/quotes.json';
import historyQuotes from './__data__/historyQuotes.json';
import today from './__data__/today.json';
import { format } from 'date-fns';

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

	it('GET /tradier/quote/history/:symbol/:date', async () => {
		const spy = jest.spyOn(httpService, 'get');
		spy.mockImplementationOnce(() => of(createResponse(historyQuotes)));

		await request(app.getHttpServer())
			.get('/tradier/quote/history/AAPL/2021-04-27')
			.expect(200, historyQuotes.history.day);

		expect(spy).toHaveBeenCalledWith(
			'/markets/history?symbol=AAPL&interval=monthly&start=2021-04-27&end=2021-04-27',
			expect.any(Object)
		);
	});

	it('GET /tradier/today/:symbol', async () => {
		const spy = jest.spyOn(httpService, 'get');
		spy.mockImplementationOnce(() => of(createResponse(today)));

		await request(app.getHttpServer())
			.get('/tradier/today/AAPL/')
			.expect(200, today.series.data);

		const todayString = format(new Date(), 'yyyy-MM-dd');
		const start = `${todayString}%2009%3A30`;
		const end = `${todayString}%2016%3A00`;

		expect(spy).toHaveBeenCalledWith(
			`/markets/timesales?symbol=AAPL&interval=1min&start=${start}&end=${end}`,
			expect.any(Object)
		);
	});
});
