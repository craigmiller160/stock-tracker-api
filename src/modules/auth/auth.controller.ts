import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { TokenDetails } from './model/jwt';
import { TokenDetailsService } from './TokenDetailsService';

@Controller('/auth')
export class AuthController {
	constructor(private readonly tokenDetailsService: TokenDetailsService) {}

	@Get('/details')
	getUserDetails(): TokenDetails {
		return this.tokenDetailsService.getTokenDetails();
	}
}
