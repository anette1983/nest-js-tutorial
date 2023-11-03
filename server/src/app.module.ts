import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    AuthModule,
    TransactionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      // указали конфиг модуль как глобальный, но нужно будет и здесь с ним работать
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // тип нашей бд
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true, //необязат параметр, в продакшене не должно быть
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        // отслеживать эту папку (папку срц) и все подпапки и все файлы, где в названии есть ентити с раширением джс и тс
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
