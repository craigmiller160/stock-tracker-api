/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpService } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';

export interface MockRequest {
	url: string;
	data?: any;
	config?: AxiosRequestConfig;
}

const createResponse = <T>(data: T): AxiosResponse<T> => ({
	data,
	headers: {},
	config: {},
	status: 200,
	statusText: 'OK'
});

export class MockHttpService extends HttpService {
	private mockFn = jest.fn();

	mockAndValidateRequest<T = any>(req: MockRequest, data: T) {
		this.mockFn.mockImplementationOnce(() => of(createResponse(data)));
	}

	reset() {
		this.mockFn.mockReset();
	}

	clear() {
		this.mockFn.mockClear();
	}

	get<T = any>(
		url: string,
		config?: AxiosRequestConfig
	): Observable<AxiosResponse<T>> {
		return this.mockFn(url, config);
	}
}
