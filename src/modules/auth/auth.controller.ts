import { Controller, Get } from '@nestjs/common';
import { TokenDetails } from './model/jwt';
import { TokenDetailsService } from './token-details.service';

@Controller('/oauth')
export class AuthController {
	constructor(private readonly tokenDetailsService: TokenDetailsService) {}

	@Get('/user')
	getUserDetails(): TokenDetails {
		return this.tokenDetailsService.getTokenDetails();
	}
}
