import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  //подключим таблицу из юзер ентити
  imports: [TypeOrmModule.forFeature([User])], //метод тайпорм фичер принимает массив схем
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
