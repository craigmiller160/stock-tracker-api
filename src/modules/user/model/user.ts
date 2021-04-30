export interface User {
	userId: number;
	userName: string;
}

// TODO if not needed, delete
export interface FullUser extends User {
	password: string;
}
