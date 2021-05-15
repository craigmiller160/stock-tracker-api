import { Controller, Get, Headers, Post, Session } from '@nestjs/common';
import { TokenDetails } from './model/jwt';
import { TokenDetailsService } from './token-details.service';
import { AuthService } from './auth.service';
import { AuthCodeLogin } from './model/AuthCodeLogin';
import { Insecure } from '../../guards/Insecure';

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

	@Insecure()
	@Post('/authcode/login')
	login(
		@Headers('origin') origin: string | undefined,
		@Session() session: Record<string, any>
	): AuthCodeLogin {
		return this.authService.login(origin, session);
	}

	@Insecure()
	@Get('/authcode/code')
	code() {
		// TODO finish this
	}

	@Insecure()
	@Get('/logout')
	logout() {
		// TODO finish this
	}
}
