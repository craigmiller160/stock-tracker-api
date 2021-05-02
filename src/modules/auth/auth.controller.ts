import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('/auth')
export class AuthController {
	@Get('/details')
	getUserDetails(@Req() req: Request): string {
		console.log(req); // TODO delete this
		return 'TODO';
	}
}
