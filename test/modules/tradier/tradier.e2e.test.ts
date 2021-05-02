import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import quotes from './__data__/quotes.json';
import { createTestingApp } from '../../testutils/e2e/createTestingApp';
import { MockHttpService } from '../../testutils/mocks/MockHttpService';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppModule } from '../../../src/app.module';

describe('TradierController (e2e)', () => {
	let app: INestApplication;
	let mockHttpService: MockHttpService;
	let signedToken: string;

	beforeEach(async () => {
		({ app, signedToken, mockHttpService } = await createTestingApp());
		await app.init();
		console.log('Initialized'); // TODO delete this
	});

	it('GET /tradier/quote/:symbol', async () => {
		mockHttpService.mockResponse(quotes);

		await request(app.getHttpServer())
			.get('/tradier/quote/AAPL')
			.set('Authorization', `Bearer ${signedToken}`)
			.expect(200, quotes.quotes.quote);

		mockHttpService.expectToHaveBeenCalledWith(
			1,
			'/markets/quotes?symbols=AAPL',
			expect.any(Object)
		);
	});

	it('GET /tradier/quote/history/:symbol/:date', async () => {
		// const spy = jest.spyOn(httpService, 'get');
		// spy.mockImplementationOnce(() => of(createResponse(historyQuotes)));
		//
		// await request(app.getHttpServer())
		// 	.get('/tradier/quote/history/AAPL/2021-04-27')
		// 	.set('Authorization', `Bearer ${token}`)
		// 	.expect(200, historyQuotes.history.day);
		//
		// expect(spy).toHaveBeenCalledWith(
		// 	'/markets/history?symbol=AAPL&interval=monthly&start=2021-04-27&end=2021-04-27',
		// 	expect.any(Object)
		// );
		throw new Error();
	});

	it('GET /tradier/today/:symbol', async () => {
		// const spy = jest.spyOn(httpService, 'get');
		// spy.mockImplementationOnce(() => of(createResponse(today)));
		//
		// await request(app.getHttpServer())
		// 	.get('/tradier/today/AAPL/')
		// 	.set('Authorization', `Bearer ${token}`)
		// 	.expect(200, today.series.data);
		//
		// const todayString = format(new Date(), 'yyyy-MM-dd');
		// const start = `${todayString}%2009%3A30`;
		// const end = `${todayString}%2016%3A00`;
		//
		// expect(spy).toHaveBeenCalledWith(
		// 	`/markets/timesales?symbol=AAPL&interval=1min&start=${start}&end=${end}`,
		// 	expect.any(Object)
		// );
		throw new Error();
	});
});
