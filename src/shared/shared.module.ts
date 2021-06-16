import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';

const providers = [ConfigService];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class SharedModule {
}
