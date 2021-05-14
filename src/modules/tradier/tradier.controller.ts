import { Controller, Get, Param, Res } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TradierService } from './tradier.service';
import { HistoryDay } from './models/historyQuotes';
import { TodayData } from './models/todayTicker';
import { Response } from 'express';

@Controller('/tradier')
export class TradierController {
	constructor(private tradierService: TradierService) {}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private sendResponse(value: any | undefined, res: Response): void {
		if (value) {
			res.status(200);
			res.send(value);
		} else {
			res.status(204);
			res.send(value);
		}
	}

	@Get('/quote/:symbol')
	getStockQuote(@Param('symbol') symbol: string, @Res() res: Response): void {
		this.tradierService
			.getQuote(symbol)
			.subscribe((quote) => this.sendResponse(quote, res));
	}

	@Get('/quote/history/:symbol/:date')
	getStockHistoryQuote(
		@Param('symbol') symbol: string,
		@Param('date') date: string
	): Observable<HistoryDay> {
		return this.tradierService.getHistoryQuote(symbol, date);
	}

	@Get('/today/:symbol')
	getStockTodayTicker(
		@Param('symbol') symbol: string
	): Observable<TodayData[]> {
		return this.tradierService.getTodayTicket(symbol);
	}
}
