import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TradierModule } from './tradier/tradier.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.env', '.env.private'],
			isGlobal: true
		}),
		TradierModule
	]
})
export class AppModule {}
