import { HttpService, Injectable, OnModuleInit } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { AxiosResponse } from 'axios';
import { JwkSet } from './model/jwk';
import { parseJwk } from 'jose/jwk/parse';
import jose from 'node-jose';
import jwkToPem, { JWK } from 'jwk-to-pem';

const jwkUrl = 'https://localhost:7003/jwk'; // TODO add to configuration

@Injectable()
export class JwkService implements OnModuleInit {
	jwkSet = new BehaviorSubject<null>(null); // TODO fix the type here

	constructor(private httpService: HttpService) {}

	onModuleInit(): void {
		this.httpService.get(jwkUrl)
			.subscribe((res: AxiosResponse<JwkSet>) => {
				const pem = jwkToPem(res.data.keys[0] as JWK); // TODO fix types
			});
	}
}
