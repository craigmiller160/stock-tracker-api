import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class JwkService implements OnModuleInit {
	message = 'Pre-init';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onModuleInit(): any {
		this.message = 'Init done';
		console.log('Message set'); // TODO delete this
	}
}
