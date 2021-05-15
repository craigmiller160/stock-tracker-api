import { Controller, Get, Param, Res } from '@nestjs/common';
import { TradierService } from './tradier.service';
import { Response } from 'express';
import { first } from 'rxjs/operators';
import { Observer } from 'rxjs';
import { AxiosError } from 'axios';

@Controller('/tradier')
export class TradierController {
	constructor(private tradierService: TradierService) {}

	private isAxiosError(ex: Error): ex is AxiosError {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return !!(ex as any).response;
	}

	private sendResponse<T>(res: Response): Observer<T> {
		return {
			next: (value: T) => {
				if (value) {
					res.status(200);
					res.send(value);
				} else {
					res.status(204);
					res.send(value);
				}
			},
			error: (ex: Error) => {
				const message =
					this.isAxiosError(ex) && ex.response?.data
						? ex.response?.data
						: ex.message;
				res.status(500);
				res.send({
					message
				});
			},
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			complete: () => {}
		};
	}

	@Get('/quote/:symbol')
	getStockQuote(@Param('symbol') symbol: string, @Res() res: Response): void {
		this.tradierService
			.getQuote(symbol)
			.pipe(first())
			.subscribe(this.sendResponse(res));
	}

	@Get('/quote/history/:symbol/:date')
	getStockHistoryQuote(
		@Param('symbol') symbol: string,
		@Param('date') date: string,
		@Res() res: Response
	): void {
		this.tradierService
			.getHistoryQuote(symbol, date)
			.pipe(first())
			.subscribe(this.sendResponse(res));
	}

	@Get('/today/:symbol')
	getStockTodayTicker(
		@Param('symbol') symbol: string,
		@Res() res: Response
	): void {
		this.tradierService
			.getTodayTicket(symbol)
			.pipe(first())
			.subscribe(this.sendResponse(res));
	}
}
