import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/model/user';

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	validateUser(username: string, password: string): User | undefined {
		const user = this.userService.findOne(username);
		if (user?.password === password) {
			const result = { ...user };
			delete result.password;
			return result;
		}
		return undefined;
	}
}
