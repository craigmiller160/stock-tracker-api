import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CLIENT_KEY } from '../../config/keys';
import { AuthCodeLogin } from './model/AuthCodeLogin';

const AUTH_CODE_LOGIN_PATH = '/ui/login';

// Only leaving here for reference purposes
@Injectable()
export class AuthService {
	constructor(private readonly configService: ConfigService) {}

	login(origin: string | undefined): AuthCodeLogin {
		if (!origin) {
			throw new HttpException(
				'Missing origin header on request',
				HttpStatus.BAD_REQUEST
			);
		}

		const state = ''; // TODO figure out how to generate this
		// TODO set it as the session

		const clientKey = this.configService.get<string>(CLIENT_KEY);
		const encodedState = ''; // TODO figure this out

		const redirectUri = `${origin}`; // TODO need to add redirect uri
		const host = `${origin}`; // TODO need to add authLoginBaseUri

		const url = `${host}${AUTH_CODE_LOGIN_PATH}?response_type=code&client_id=${clientKey}&redirect_uri=${redirectUri}&state=${encodedState}`;
		return {
			url
		};
	}
}
