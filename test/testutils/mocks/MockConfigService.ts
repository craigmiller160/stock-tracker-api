import { ConfigService, NoInferType } from '@nestjs/config';
import { CLIENT_KEY, CLIENT_NAME } from '../../../src/config/keys';

export const MOCK_CLIENT_KEY = 'clientKey';
export const MOCK_CLIENT_NAME = 'clientName';

export class MockConfigService extends ConfigService {
	private config = {
		[CLIENT_KEY]: MOCK_CLIENT_KEY,
		[CLIENT_NAME]: MOCK_CLIENT_NAME
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
