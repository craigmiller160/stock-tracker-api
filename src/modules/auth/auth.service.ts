import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CLIENT_KEY } from '../../config/keys';
import { AuthCodeLogin } from './model/AuthCodeLogin';
import crypto from 'crypto';

const AUTH_CODE_LOGIN_PATH = '/ui/login';
const STATE_KEY = 'state';
const STATE_EXP_KEY = 'state-exp';
const STATE_ORIGIN_KEY = 'state-origin';

@Injectable()
export class AuthService {
	constructor(private readonly configService: ConfigService) {}

	login(origin: string | undefined, session: Record<string,any>): AuthCodeLogin {
		if (!origin) {
			throw new HttpException(
				'Missing origin header on request',
				HttpStatus.BAD_REQUEST
			);
		}

		const state = crypto.randomBytes(4).readUInt32BE(0).toString(32);
		session[STATE_KEY] = encodeURIComponent(state);

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
