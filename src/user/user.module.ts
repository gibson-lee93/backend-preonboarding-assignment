import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'randomsecret',
      signOptions: {
        expiresIn: '3h',
      },
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
