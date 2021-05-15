import {Controller, Get, Post} from '@nestjs/common';
import { TokenDetails } from './model/jwt';
import { TokenDetailsService } from './token-details.service';

@Controller('/oauth')
export class AuthController {
	constructor(private readonly tokenDetailsService: TokenDetailsService) {}

	@Get('/user')
	getUserDetails(): TokenDetails {
		return this.tokenDetailsService.getTokenDetails();
	}

	@Post('/authcode/login')
	login() {
		// TODO finish this
	}

	@Get('/authcode/code')
	code() {
		// TODO finish this
	}

	@Get('/logout')
	logout() {
		// TODO finish this
	}
}

