import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ForbiddenExceptionFilter } from './filter/forbidden-exception.filter';
import { InternalServerErrorFilter } from './filter/internal-server-error.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ForbiddenExceptionFilter(), new InternalServerErrorFilter());

  await app.listen(3000);
}
bootstrap();
