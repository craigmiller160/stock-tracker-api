import {Controller, Get, Headers, Post, Session} from '@nestjs/common';
import {TokenDetails} from './model/jwt';
import {TokenDetailsService} from './token-details.service';
import {AuthService} from './auth.service';
import {AuthCodeLogin} from './model/AuthCodeLogin';

@Controller('/oauth')
export class AuthController {
	constructor(
		private readonly tokenDetailsService: TokenDetailsService,
		private readonly authService: AuthService
	) {}

	@Get('/user')
	getUserDetails(): TokenDetails {
		return this.tokenDetailsService.getTokenDetails();
	}

	@Post('/authcode/login')
	login(@Headers('origin') origin: string | undefined, @Session() session: Record<string, any>): AuthCodeLogin {
		return this.authService.login(origin, session);
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
