import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { stringify } from 'qs';
import { TRADIER_API_KEY, TRADIER_BASE_URL } from '../config/keys';
import { Quote, QuotesWrapper } from './models/quotes';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HistoryDay, HistoryWrapper } from './models/historyQuotes';

@Injectable()
export class TradierService {
	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService
	) {}

	getQuote(symbol: string): Observable<Quote> {
		const query = stringify({ symbols: symbol });
		return this.httpService
			.get<QuotesWrapper>(`/markets/quotes?${query}`, this.getConfig())
			.pipe(map((res) => res.data.quotes.quote));
	}

	getHistoryQuote(symbol: string, date: string): Observable<HistoryDay> {
		const query = stringify({ symbol, interval: 'monthly', start: date, end: date });
		return this.httpService
			.get<HistoryWrapper>(`/markets/history?${query}`, this.getConfig())
			.pipe(map((res) => res.data.history.day));
	}

	getTimeAndSales(symbol: string) {
		// TODO finish this
	}

	private getConfig(): AxiosRequestConfig {
		return {
			baseURL: this.configService.get<string>(TRADIER_BASE_URL),
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${this.configService.get<string>(
					TRADIER_API_KEY
				)}`
			}
		};
	}
}
