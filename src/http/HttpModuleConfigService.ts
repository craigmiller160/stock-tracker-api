import {
	HttpModuleOptions,
	HttpModuleOptionsFactory,
	Injectable
} from '@nestjs/common';
import { Agent } from 'https';

@Injectable()
export class HttpModuleConfigService implements HttpModuleOptionsFactory {
	createHttpOptions(): HttpModuleOptions {
		return {
			timeout: 10000,
			maxRedirects: 5,
			httpsAgent: new Agent({
				rejectUnauthorized: false
			})
		};
	}
}
