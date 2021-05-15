import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { httpsOptions } from './tls';
import { NestExpressApplication } from '@nestjs/platform-express';
import nocache from 'nocache';
import session from './session';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		httpsOptions
	});
	app.use(nocache());
	app.use(session);
	app.disable('x-powered-by');
	await app.listen(8080);
}
bootstrap();
