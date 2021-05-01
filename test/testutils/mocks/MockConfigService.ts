import { ConfigService, NoInferType } from '@nestjs/config';
import { CLIENT_KEY, CLIENT_NAME } from '../../../src/config/keys';

export class MockConfigService extends ConfigService {
	private config = {
		[CLIENT_KEY]: 'clientKey',
		[CLIENT_NAME]: 'clientName'
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
