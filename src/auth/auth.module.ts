import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy
  ]
})
export class AuthModule {}
