export interface Role {
	name: string;
}

export interface Claims {
	sub: string;
	lastName: string;
	clientName: string;
	roles: Role[];
	userId: number;
	firstName: string;
	nbf: number;
	clientKey: string;
	userEmail: string;
	exp: number;
	iat: number;
	jti: string;
}

export interface TokenResponse {
	access_token: string;
}


export interface TokenDetails {
	lastName: string;
	firstName: string;
	userEmail: string;
	roles: Role[];
}
