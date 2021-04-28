export interface User {
	userId: number;
	userName: string;
}

export interface FullUser extends User {
	password: string;
}
