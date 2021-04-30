import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { Claims } from './model/jwt';
import { User } from '../user/model/user';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

type doneFn = (err: any, secretOrKey?: string | Buffer) => void;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKeyProvider: (req: Request, rawJwt: string, done: doneFn) => {
				done(null, jwtConstants.secret);
			}
		});
	}

	validate(payload: Claims): User {
		return {
			userId: payload.sub,
			userName: payload.userName
		};
	}
}
