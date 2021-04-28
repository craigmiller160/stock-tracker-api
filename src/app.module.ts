import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TradierModule } from './tradier/tradier.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.env', '.env.private'],
			isGlobal: true
		}),
		TradierModule,
		AuthModule
	]
})
export class AppModule {}
