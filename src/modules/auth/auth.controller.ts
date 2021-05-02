import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { TokenDetails } from './model/jwt';

@Controller('/auth')
export class AuthController {
	// TODO try moving this user logic into a service
	@Get('/details')
	getUserDetails(@Req() req: Request): TokenDetails {
		return req.user as TokenDetails;
	}
}
