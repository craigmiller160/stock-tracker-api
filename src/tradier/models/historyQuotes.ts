export interface HistoryDay {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface History {
    day: HistoryDay;
}

export interface HistoryWrapper {
    history: History;
}