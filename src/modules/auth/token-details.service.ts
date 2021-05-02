import { Inject, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { TokenDetails } from './model/jwt';

@Injectable({ scope: Scope.REQUEST })
export class TokenDetailsService {
	constructor(@Inject(REQUEST) private readonly request: Request) {}

	getTokenDetails(): TokenDetails {
		return this.request.user as TokenDetails;
	}
}
