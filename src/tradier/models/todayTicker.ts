export interface TodayData {
	time: string;
	timestamp: number;
	price: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	vwap: number;
}

export interface Series {
	data: TodayData[];
}

export interface SeriesWrapper {
	series: Series;
}
