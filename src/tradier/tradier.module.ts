import { HttpModule, Module } from '@nestjs/common';
import { TradierController } from './tradier.controller';
import { TradierService } from './tradier.service';

@Module({
	imports: [
		HttpModule.register({
			timeout: 10000,
			maxRedirects: 5
		})
	],
	controllers: [TradierController],
	providers: [TradierService]
})
export class TradierModule {}
