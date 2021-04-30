import { AxiosError } from 'axios';

// TODO improve the types here

const isAxiosError = (error: any): error is AxiosError => !!error.response;

export const ajaxErrorHandler = (error: Error): any => {
    if (isAxiosError(error)) {
        return error.response.data;
    }
    return error.stack;
}
