import { HttpModule, Module } from '@nestjs/common';
import { TradierController } from './tradier.controller';

@Module({
	imports: [
		HttpModule.register({
			timeout: 10000,
			maxRedirects: 5
		})
	],
	controllers: [TradierController]
})
export class TradierModule {}
