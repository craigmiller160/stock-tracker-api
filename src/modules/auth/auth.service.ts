import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	AUTH_CODE_REDIRECT_URI,
	AUTH_CODE_WAIT_MINS,
	AUTH_LOGIN_BASE_URI,
	CLIENT_KEY
} from '../../config/keys';
import { AuthCodeLogin } from './model/AuthCodeLogin';
import crypto from 'crypto';
import addMinutes from 'date-fns/addDays';

const AUTH_CODE_LOGIN_PATH = '/ui/login';
const STATE_KEY = 'state';
const STATE_EXP_KEY = 'state-exp';
const STATE_ORIGIN_KEY = 'state-origin';

@Injectable()
export class AuthService {
	constructor(private readonly configService: ConfigService) {}

	login(
		origin: string | undefined,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		session: Record<string, any>
	): AuthCodeLogin {
		if (!origin) {
			throw new HttpException(
				'Missing origin header on request',
				HttpStatus.BAD_REQUEST
			);
		}

		const state = crypto.randomBytes(4).readUInt32BE(0).toString(32);
		session[STATE_KEY] = state;
		session[STATE_ORIGIN_KEY] = origin;
		session[STATE_EXP_KEY] = addMinutes(
			new Date(),
			parseInt(this.configService.get<string>(AUTH_CODE_WAIT_MINS))
		);

		const clientKey = this.configService.get<string>(CLIENT_KEY);
		const encodedState = encodeURIComponent(state);

		const redirectUri = encodeURIComponent(
			`${origin}${this.configService.get<string>(AUTH_CODE_REDIRECT_URI)}`
		);
		const host = `${origin}${this.configService.get<string>(
			AUTH_LOGIN_BASE_URI
		)}`;

		const url = `${host}${AUTH_CODE_LOGIN_PATH}?response_type=code&client_id=${clientKey}&redirect_uri=${redirectUri}&state=${encodedState}`;
		return {
			url
		};
	}
}
