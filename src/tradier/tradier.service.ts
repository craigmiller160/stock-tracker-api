import { HttpService, Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import qs from 'qs';
import { TRADIER_API_KEY, TRADIER_BASE_URL } from '../config/keys';
import { Quote, QuotesWrapper } from './models/quotes';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TradierService {
	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService
	) {}

	getQuote(symbol: string): Observable<Quote> {
		const query = qs.stringify({ symbols: symbol });
		return this.httpService
			.get<QuotesWrapper>(`/markets/quotes?${query}`, this.getConfig())
			.pipe(map((res) => res.data.quotes.quote));
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
