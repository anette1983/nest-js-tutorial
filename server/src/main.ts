import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // http://localhost:3001/api/profile
  app.setGlobalPrefix('api')
  app.enableCors()
  await app.listen(3001)
}
bootstrap()
