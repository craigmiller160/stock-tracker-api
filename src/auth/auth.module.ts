import { HttpModule, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { JwkService } from './jwk.service';
import * as https from 'https';

@Module({
	imports: [
		HttpModule.register({ // TODO find a way to not have to do this every module
			timeout: 10000,
			maxRedirects: 5,
			httpsAgent: new https.Agent({
				rejectUnauthorized: false
			})
		}),
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '60s' }
		})
	],
	providers: [AuthService, LocalStrategy, JwtStrategy, JwkService],
	controllers: [AuthController]
})
export class AuthModule {}
