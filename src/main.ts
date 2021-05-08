import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { httpsOptions } from './tls';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		httpsOptions
	});
	await app.listen(3000);
}
bootstrap();
