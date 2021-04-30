import { HttpService, Injectable, OnModuleInit } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { AxiosResponse } from 'axios';
import { JwkSet } from './model/jwk';
import jwkToPem from 'jwk-to-pem';

const jwkUrl = 'https://localhost:7003/jwk'; // TODO add to configuration

@Injectable()
export class JwkService implements OnModuleInit {
	jwkSet = new BehaviorSubject<null>(null); // TODO fix the type here

	constructor(private httpService: HttpService) {}

	onModuleInit(): void {
		this.httpService.get(jwkUrl).subscribe((res: AxiosResponse<JwkSet>) => {
			const pem = jwkToPem(res.data.keys[0]);
		});
	}
}
