import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { Claims } from './model/jwt';
import { User } from '../user/model/user';
import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { JwkService } from './jwk.service';

type doneFn = (err: any, secretOrKey?: string | Buffer) => void;

// TODO validate that the client is correct

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	private readonly logger = new Logger(JwtStrategy.name);

	constructor(private readonly jwkService: JwkService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKeyProvider: (
				req: Request,
				rawJwt: string,
				done: doneFn
			) => {
				console.log('InCallback'); // TODO delete this
				jwkService.key
					.subscribe({
						next: (value) => {
							this.logger.log('InNext', value); // TODO delete this
							done(null, value);
						},
						error: (error) => {
							this.logger.error('InError', error); // TODO delete this
							done(error);
						}
					})
					.unsubscribe();
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
