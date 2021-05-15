import { ConfigService, NoInferType } from '@nestjs/config';
import {
	AUTH_CODE_REDIRECT_URI,
	AUTH_LOGIN_BASE_URI,
	AUTH_SERVER_HOST,
	CLIENT_KEY,
	CLIENT_NAME,
	TRADIER_API_KEY,
	TRADIER_BASE_URL
} from '../../../src/config/keys';

export const MOCK_CLIENT_KEY = 'clientKey';
export const MOCK_CLIENT_NAME = 'clientName';
export const MOCK_TRADIER_BASE_URL = 'https://tradier.com';
export const MOCK_TRADIER_API_KEY = 'tradierApiKey';
export const MOCK_AUTH_SERVER_HOST = 'https://authServerHost';
export const MOCK_AUTH_CODE_REDIRECT_URI =
	'/stock-tracker/api/oauth/authcode/code';
export const MOCK_AUTH_LOGIN_BASE_URI = '/stock-tracker/oauth2';

export class MockConfigService extends ConfigService {
	private config = {
		[CLIENT_KEY]: MOCK_CLIENT_KEY,
		[CLIENT_NAME]: MOCK_CLIENT_NAME,
		[TRADIER_BASE_URL]: MOCK_TRADIER_BASE_URL,
		[TRADIER_API_KEY]: MOCK_TRADIER_API_KEY,
		[AUTH_SERVER_HOST]: MOCK_AUTH_SERVER_HOST,
		[AUTH_CODE_REDIRECT_URI]: MOCK_AUTH_CODE_REDIRECT_URI,
		[AUTH_LOGIN_BASE_URI]: MOCK_AUTH_LOGIN_BASE_URI
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get<T = any>(
		propertyPath: string,
		defaultValue: NoInferType<T> = undefined
	): T | undefined {
		const value = this.config[propertyPath];
		if (value) {
			return value;
		}
		return defaultValue;
	}
}
