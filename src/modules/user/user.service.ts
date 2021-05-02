import { Injectable } from '@nestjs/common';
import { FullUser } from './model/user';

@Injectable()
export class UserService {
	private readonly users: FullUser[] = [
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

	findOne(userName: string): FullUser | undefined {
		return this.users.find((user) => user.userName === userName);
	}
}
