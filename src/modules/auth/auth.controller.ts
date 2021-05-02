import { Controller, Get } from '@nestjs/common';
import { TokenDetails } from './model/jwt';
import { TokenDetailsService } from './token-details.service';

@Controller('/auth')
export class AuthController {
	constructor(private readonly tokenDetailsService: TokenDetailsService) {}

	@Get('/details')
	getUserDetails(): TokenDetails {
		return this.tokenDetailsService.getTokenDetails();
	}
}
