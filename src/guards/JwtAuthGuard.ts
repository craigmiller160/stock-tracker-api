import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}

	// handleRequest(err: any, user: any, info: any) {
	// 	// You can throw an exception based on either "info" or "err" arguments
	// 	if (err || !user) {
	// 		throw err || new UnauthorizedException();
	// 	}
	// 	return user;
	// }
}
