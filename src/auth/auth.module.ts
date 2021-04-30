import { HttpModule, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwkService } from './jwk.service';
import { Agent } from 'https';
import { HttpModuleConfigService } from '../http/HttpModuleConfigService';

@Module({
	imports: [
		HttpModule.registerAsync({
			useClass: HttpModuleConfigService
		}),
		UserModule,
		PassportModule,
		JwtModule.register({})
	],
	providers: [AuthService, LocalStrategy, JwtStrategy, JwkService],
	controllers: [AuthController]
})
export class AuthModule {}
