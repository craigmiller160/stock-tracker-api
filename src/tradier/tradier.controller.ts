import { Controller, Get, Param } from '@nestjs/common';

@Controller('/tradier')
export class TradierController {
	@Get('/quote/:symbol')
	getStockQuote(@Param('symbol') symbol: string) {
		// TODO finish this
	}

	@Get('/quote/history/:symbol')
	getStockHistoryQuote(@Param('symbol') symbol: string, date: string) {
		// TODO finish this
	}
}
