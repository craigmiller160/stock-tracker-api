import { Injectable } from '@nestjs/common';
import { User } from './model/user';

@Injectable()
export class UserService {
	private readonly users: User[] = [
		{
			userId: 1,
			userName: 'john',
			password: 'changeme'
		},
		{
			userId: 2,
			userName: 'maria',
			password: 'guess'
		}
	];

	findOne(userName: string): User | undefined {
		return this.users.find((user) => user.userName === userName);
	}
}
