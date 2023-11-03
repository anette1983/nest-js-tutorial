import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // тут можем удалить эти роуты, тк нам не нужно на главную страницу запросы
  //http://localhost:3000/api/
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // //http://localhost:3000/profile
  // @Get('profile')
  // getProfile(): string {
  //   return this.appService.getProfile();
  // }
}
