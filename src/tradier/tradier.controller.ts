import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Quote } from './models/quotes';
import { TradierService } from './tradier.service';

@Controller('/tradier')
export class TradierController {
	constructor(private tradierService: TradierService) {}


	@Get('/quote/:symbol')
	getStockQuote(@Param('symbol') symbol: string): Observable<Quote> {
		return this.tradierService.getQuote(symbol);
	}

	@Get('/quote/history/:symbol')
	getStockHistoryQuote(@Param('symbol') symbol: string, date: string) {
		// TODO finish this
	}
}
