import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/LocalAuthGuard';
import { User } from '../user/model/user';

interface RequestWithUser extends Request {
	user: User;
}

@Controller('/auth')
export class AuthController {
	// TODO learn guards
	@UseGuards(LocalAuthGuard)
	@Post('/login')
	login(@Request() req: RequestWithUser): User {
		return req.user;
	}
}
