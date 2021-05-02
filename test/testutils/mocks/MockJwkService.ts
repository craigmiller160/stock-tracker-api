import { JwkService } from '../../../src/modules/auth/jwk.service';
import { OnModuleInit } from '@nestjs/common';

export class MockJwkService extends JwkService implements OnModuleInit {
	onModuleInit(): void {
		// Do nothing
	}
}
