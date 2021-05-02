import { Controller, Get } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
	@Get('/details')
	getUserDetails(): string {
		return 'TODO';
	}
}
