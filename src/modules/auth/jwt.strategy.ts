import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Claims } from './model/jwt';
import { User } from '../user/model/user';
import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { JwkService } from './jwk.service';
import { ajaxErrorHandler } from '../../http/ajaxErrorHandler';
import { ConfigService } from '@nestjs/config';
import { CLIENT_KEY } from '../../config/keys';

type doneFn = (err: any, secretOrKey?: string | Buffer) => void;

// TODO validate that the client is correct

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	private readonly logger = new Logger(JwtStrategy.name);

	constructor(private readonly jwkService: JwkService, private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKeyProvider: (
				req: Request,
				rawJwt: string,
				done: doneFn
			) => {
				jwkService.key
					.subscribe({
						next: (value: string) => done(null, value),
						error: (error: Error) => {
							this.logger.error(
								'Error getting JWK key',
								ajaxErrorHandler(error)
							);
							done(error);
						}
					})
					.unsubscribe();
			}
		});
	}

	validate(payload: Claims): User {
		console.log('Validating', payload); // TODO delete this
		return {
			userId: payload.sub,
			userName: payload.userName
		};
	}
}
