/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/model/user';
import { JwtService } from '@nestjs/jwt';
import { Claims, TokenResponse } from './model/jwt';

// Only leaving here for reference purposes
@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	validateUser(username: string, password: string): User | undefined {
		const user = this.userService.findOne(username);
		if (user?.password === password) {
			const result = { ...user };
			delete result.password;
			return result;
		}
		return undefined;
	}

	login(user: User): TokenResponse {
		// const claims: Partial<Claims> = {
		// 	userName: user.userName,
		// user.userId;
		// sub: ''
		// };
		// return {
		// 	access_token: this.jwtService.sign(claims)
		// };
		return null;
	}
}
