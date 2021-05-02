/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';

const isAxiosError = (error: any): error is AxiosError => !!error.response;

export const ajaxErrorHandler = (error: Error): any => {
	if (isAxiosError(error)) {
		return error.response.data;
	}
	return error.stack;
};
