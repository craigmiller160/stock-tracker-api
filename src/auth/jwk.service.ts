import { Injectable, OnModuleInit } from '@nestjs/common';
import { createRemoteJWKSet } from 'jose/jwks/remote'

// TODO make the jwkset url configurable
@Injectable()
export class JwkService implements OnModuleInit {

	onModuleInit(): void {
		const jwkSet = createRemoteJWKSet(new URL('https://localhost:7003/jwk'));
		console.log('JwkSet', jwkSet.getKey('')); // TODO delete this
	}
}
