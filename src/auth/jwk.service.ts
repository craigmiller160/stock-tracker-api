import {
	HttpService,
	Injectable,
	OnModuleDestroy,
	OnModuleInit
} from '@nestjs/common';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AxiosResponse } from 'axios';
import { JwkSet } from './model/jwk';
import jwkToPem from 'jwk-to-pem';
import { map } from 'rxjs/operators';

const jwkUrl = 'https://localhost:7003/jwk'; // TODO add to configuration

// TODO need error handling that kills whole app

@Injectable()
export class JwkService implements OnModuleInit, OnModuleDestroy {
	readonly key = new BehaviorSubject<string>('');
	private subscription: Subscription;

	constructor(private httpService: HttpService) {}

	onModuleInit(): void {
		this.subscription = this.httpService
			.get(jwkUrl)
			.pipe(
				map((res: AxiosResponse<JwkSet>) => jwkToPem(res.data.keys[0]))
			)
			.subscribe(this.key);
	}

	onModuleDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
