import { HttpService, Injectable, OnModuleInit } from '@nestjs/common';
import { createRemoteJWKSet } from 'jose/jwks/remote'
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import * as https from 'https';

const jwkUrl = 'https://localhost:7003/jwk';

// TODO make the jwkset url configurable
@Injectable()
export class JwkService implements OnModuleInit {
	jwkSet = new BehaviorSubject<null>(null); // TODO fix the type here

	constructor(private httpService: HttpService) {}

	onModuleInit(): void {
		console.log('Initializing'); // TODO delete this
		// const jwkSet = createRemoteJWKSet(new URL('https://localhost:7003/jwk'));
		// this.httpService.get(jwkUrl)
		// 	.subscribe((value) => {
		// 		console.log('In subscription');
		// 		console.log(value);
		// 	});
		axios.get(jwkUrl, {
			httpsAgent: new https.Agent({
				rejectUnauthorized: false
			})
		})
			.then((res) => console.log(res.data))
			.catch((ex) => console.error(ex.message));
	}
}
