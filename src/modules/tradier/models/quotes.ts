export interface Quote {
	symbol: string;
	description: string;
	exch: string;
	type: string;
	last: number;
	change: number;
	volume: number;
	open: number;
	high: number;
	low: number;
	close: number;
	bid: number;
	ask: number;
	change_percentage: number;
	average_volume: number;
	last_volume: number;
	trade_date: number;
	prevclose: number;
	week_52_high: number;
	week_52_low: number;
	bidsize: number;
	bidexch: string;
	bid_date: number;
	asksize: number;
	askexch: string;
	ask_date: number;
	root_symbols: string;
}

export interface Quotes {
	quote: Quote | undefined;
}

export interface QuotesWrapper {
	quotes: Quotes;
}
