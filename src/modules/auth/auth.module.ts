import { AuthController } from "./auth.controller";
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "60m"}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuardService]
})
export class AuthModule {}
