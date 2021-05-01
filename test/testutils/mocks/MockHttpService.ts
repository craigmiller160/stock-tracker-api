/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpService } from '@nestjs/common';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';

const createResponse = <T>(data: T): AxiosResponse<T> => ({
	data,
	headers: {},
	config: {},
	status: 200,
	statusText: 'OK'
});

export class MockHttpService extends HttpService {
	private mockFn = jest.fn();

	constructor(instance?: AxiosInstance) {
        super(instance);
        console.log('Creating'); // TODO delete this
    }

	mockResponse<T = any>(data: T): void {
		this.mockFn.mockReturnValue(of(createResponse(data)));
	}

	expectToHaveBeenCalledWith(time: number, ...params: any[]): void {
		expect(this.mockFn).toHaveBeenNthCalledWith(time, params);
	}

	reset(): void {
		this.mockFn.mockReset();
	}

	clear(): void {
		this.mockFn.mockClear();
	}

	get<T = any>(
		url: string,
		config?: AxiosRequestConfig
	): Observable<AxiosResponse<T>> {
		return this.mockFn(url, config);
	}
}
