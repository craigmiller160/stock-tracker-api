import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Quote } from './models/quotes';
import { TradierService } from './tradier.service';
import { HistoryDay } from './models/historyQuotes';

@Controller('/tradier')
export class TradierController {
	constructor(private tradierService: TradierService) {}

	@Get('/quote/:symbol')
	getStockQuote(@Param('symbol') symbol: string): Observable<Quote> {
		return this.tradierService.getQuote(symbol);
	}

	@Get('/quote/history/:symbol/:date')
	getStockHistoryQuote(@Param('symbol') symbol: string,
						 @Param('date') date: string): Observable<HistoryDay> {
		return this.tradierService.getHistoryQuote(symbol, date);
	}
}
