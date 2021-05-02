import { HttpModule, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwkService } from './jwk.service';
import { HttpModuleConfigService } from '../../http/HttpModuleConfigService';

@Module({
	imports: [
		HttpModule.registerAsync({
			useClass: HttpModuleConfigService
		}),
		UserModule,
		PassportModule,
		JwtModule.register({})
	],
	providers: [JwtStrategy, JwkService],
	controllers: [AuthController]
})
export class AuthModule {}
