import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/LocalAuthGuard';
import { User } from '../user/model/user';
import { AuthService } from './auth.service';
import { TokenResponse } from './model/jwt';
import { Insecure } from '../guards/Insecure';

interface RequestWithUser extends Request {
	user: User;
}

@Controller('/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// TODO delete this
	@Insecure()
	@UseGuards(LocalAuthGuard)
	@Post('/login')
	login(@Request() req: RequestWithUser): TokenResponse {
		return this.authService.login(req.user);
	}
}
