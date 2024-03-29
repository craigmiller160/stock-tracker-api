import { HttpService, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ReplaySubject, Subscription } from 'rxjs';
import { AxiosResponse } from 'axios';
import { JwkSet } from './model/jwk';
import jwkToPem from 'jwk-to-pem';
import { first, map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';
import { AUTH_SERVER_HOST } from '../../config/keys';

const jwkUri = '/jwk';

@Injectable()
export class JwkService implements OnModuleInit {
	private readonly logger = new Logger(JwkService.name);

	readonly key = new ReplaySubject<string>();
	private subscription: Subscription;

	constructor(
		private httpService: HttpService,
		private configService: ConfigService
	) {}

	onModuleInit(): void {
		this.logger.log('Loading the JWKSet');
		this.httpService
			.get(`${this.configService.get<string>(AUTH_SERVER_HOST)}${jwkUri}`)
			.pipe(
				first(),
				map((res: AxiosResponse<JwkSet>) => jwkToPem(res.data.keys[0]))
			)
			.subscribe(this.key);
	}
}
