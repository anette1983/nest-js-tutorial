import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  //подключим таблицу из юзер ентити
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      // это поле не нужно, если есть верификация после регистр
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.get('JWT_SECRET'),
        signOptions: { expiresIn: '23h' },
      }),
      inject: [ConfigService],
    }),
  ], //метод тайпорм фичер принимает массив схем
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
