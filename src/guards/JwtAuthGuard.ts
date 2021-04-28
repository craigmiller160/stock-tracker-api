import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_INSECURE_KEY } from './Insecure';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private readonly reflector: Reflector) {
		super();
	}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const isInsecure = this.reflector.getAllAndOverride<boolean>(
			IS_INSECURE_KEY,
			[context.getHandler(), context.getClass()]
		);

		return isInsecure || super.canActivate(context);
	}

	// handleRequest(err: any, user: any, info: any) {
	// 	// You can throw an exception based on either "info" or "err" arguments
	// 	if (err || !user) {
	// 		throw err || new UnauthorizedException();
	// 	}
	// 	return user;
	// }
}
