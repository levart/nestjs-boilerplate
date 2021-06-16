import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configService } from './shared/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import * as fs from 'fs';
import { SharedModule } from './shared/shared.module';
import { contextMiddleware } from './middlewares';

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configService.typeOrmConfig, null, 2),
);

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.typeOrmConfig),
    SharedModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
  }
}
