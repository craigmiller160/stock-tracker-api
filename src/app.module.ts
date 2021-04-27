import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

// TODO AppController & AppService can go away
@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.env', '.env.private']
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
