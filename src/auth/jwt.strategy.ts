import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { Claims } from './model/jwt';
import { User } from '../user/model/user';
import { Injectable } from '@nestjs/common';
import { JwkService } from './jwk.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly jwkService: JwkService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret
		});
		console.log(jwkService.message); // TODO delete this
	}

	validate(payload: Claims): User {
		return {
			userId: payload.sub,
			userName: payload.userName
		};
	}
}
