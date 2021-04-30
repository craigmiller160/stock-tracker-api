import { Injectable, OnModuleInit } from '@nestjs/common';
import { createRemoteJWKSet } from 'jose/jwks/remote'
import { BehaviorSubject } from 'rxjs';

// TODO make the jwkset url configurable
@Injectable()
export class JwkService implements OnModuleInit {
	jwkSet = new BehaviorSubject<null>(null); // TODO fix the type here

	onModuleInit(): void {
		const jwkSet = createRemoteJWKSet(new URL('https://localhost:7003/jwk'));
		console.log('JwkSet', jwkSet.getKey('')); // TODO delete this
	}
}
