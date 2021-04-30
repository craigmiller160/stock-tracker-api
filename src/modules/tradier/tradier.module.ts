import { HttpModule, Module } from '@nestjs/common';
import { TradierController } from './tradier.controller';
import { TradierService } from './tradier.service';
import { HttpModuleConfigService } from '../../http/HttpModuleConfigService';

@Module({
	imports: [
		HttpModule.registerAsync({
			useClass: HttpModuleConfigService
		})
	],
	controllers: [TradierController],
	providers: [TradierService]
})
export class TradierModule {}
