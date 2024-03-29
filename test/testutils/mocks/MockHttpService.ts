/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpService } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';

const createResponse = <T>(data: T): AxiosResponse<T> => ({
	data,
	headers: {},
	config: {},
	status: 200,
	statusText: 'OK'
});

export class MockHttpService extends HttpService {
	private static mockFn = jest.fn();

	constructor() {
		super(null);
	}

	static mockResponse<T = any>(data: T): void {
		MockHttpService.mockFn.mockReturnValue(of(createResponse(data)));
	}

	static expectToHaveBeenCalledWith(time: number, ...params: any[]): void {
		expect(MockHttpService.mockFn).toHaveBeenNthCalledWith(time, ...params);
	}

	static reset(): void {
		MockHttpService.mockFn.mockReset();
	}

	static clear(): void {
		MockHttpService.mockFn.mockClear();
	}

	get<T = any>(
		url: string,
		config?: AxiosRequestConfig
	): Observable<AxiosResponse<T>> {
		return MockHttpService.mockFn(url, config);
	}
}

beforeEach(() => {
	MockHttpService.reset();
});
