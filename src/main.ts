import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { configService } from './shared/config/config.service';
import * as helmet from 'helmet';
import './boilerplate.polyfill';
import { GlobalExceptionsFilter } from './common/exceptions/GlobalExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.enableCors();
  setupSwagger(app);
  const port = configService.getNumber('PORT')  || 3001;
  await app.listen(port);
  console.info(`server running on port ${port}`);
}

bootstrap();
