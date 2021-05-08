import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { httpsOptions } from './tls';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		httpsOptions
	});
	app.disable('x-powered-by');
	await app.listen(3000);
}
bootstrap();
