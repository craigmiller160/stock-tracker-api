import { Controller, Get } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
	constructor() {}

	@Get('/details')
	getUserDetails(): string {
		return 'TODO';
	}
}
