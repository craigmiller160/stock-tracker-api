import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fs from 'fs';
import path from 'path';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';

const keyPath = path.resolve(__dirname, 'cert', 'stock-tracker.key.pem');
const certPath = path.resolve(__dirname, 'cert', 'stock-tracker.cert.pem');

const httpsOptions: HttpsOptions = {
	key: fs.readFileSync(keyPath),
	cert: fs.readFileSync(certPath)
};

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		httpsOptions
	});
	await app.listen(3000);
}
bootstrap();
