import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import quotes from './__data__/quotes.json';
import historyQuotes from './__data__/historyQuotes.json';
import today from './__data__/today.json';
import { createTestingApp } from '../../testutils/e2e/createTestingApp';
import { MockHttpService } from '../../testutils/mocks/MockHttpService';
import { format } from 'date-fns';

describe('TradierController (e2e)', () => {
	let app: INestApplication;
	let signedToken: string;

	beforeEach(async () => {
		({ app, signedToken } = await createTestingApp());
		await app.init();
	});

	it('GET /tradier/quote/:symbol', async () => {
		MockHttpService.mockResponse(quotes);

		await request(app.getHttpServer())
			.get('/tradier/quote/AAPL')
			.set('Authorization', `Bearer ${signedToken}`)
			.expect(200, quotes.quotes.quote);

		MockHttpService.expectToHaveBeenCalledWith(
			1,
			'/markets/quotes?symbols=AAPL',
			expect.any(Object)
		);
	});

	it('GET /tradier/quote/history/:symbol/:date', async () => {
		MockHttpService.mockResponse(historyQuotes);

		await request(app.getHttpServer())
			.get('/tradier/quote/history/AAPL/2021-04-27')
			.set('Authorization', `Bearer ${signedToken}`)
			.expect(200, historyQuotes.history.day);

		MockHttpService.expectToHaveBeenCalledWith(
			1,
			'/markets/history?symbol=AAPL&interval=monthly&start=2021-04-27&end=2021-04-27',
			expect.any(Object)
		);
	});

	it('GET /tradier/today/:symbol', async () => {
		MockHttpService.mockResponse(today);

		await request(app.getHttpServer())
			.get('/tradier/today/AAPL/')
			.set('Authorization', `Bearer ${signedToken}`)
			.expect(200, today.series.data);

		const todayString = format(new Date(), 'yyyy-MM-dd');
		const start = `${todayString}%2009%3A30`;
		const end = `${todayString}%2016%3A00`;

		MockHttpService.expectToHaveBeenCalledWith(
			1,
			`/markets/timesales?symbol=AAPL&interval=1min&start=${start}&end=${end}`,
			expect.any(Object)
		);
	});
});
