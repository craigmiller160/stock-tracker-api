import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TradierModule } from './tradier/tradier.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/JwtAuthGuard';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.env', '.env.private'],
			isGlobal: true
		}),
		TradierModule,
		AuthModule
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	]
})
export class AppModule {}
