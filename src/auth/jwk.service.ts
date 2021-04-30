import { HttpService, Injectable, OnModuleInit } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

const jwkUrl = 'https://localhost:7003/jwk'; // TODO add to configuration

@Injectable()
export class JwkService implements OnModuleInit {
	jwkSet = new BehaviorSubject<null>(null); // TODO fix the type here

	constructor(private httpService: HttpService) {}

	onModuleInit(): void {
		// const jwkSet = createRemoteJWKSet(new URL('https://localhost:7003/jwk'));
		this.httpService.get(jwkUrl)
			.subscribe((value) => {
				console.log('In subscription');
				console.log(value.data);
			});
	}
}
