import { Controller, Get } from '@nestjs/common';

@Controller('/tradier')
export class TradierController {
  @Get('/quote')
  getStockQuote(symbol: string) {
    // TODO finish this
  }

  @Get('/quote/history')
  getStockHistoryQuote(symbol: string, date: string) {
    // TODO finish this
  }
}
