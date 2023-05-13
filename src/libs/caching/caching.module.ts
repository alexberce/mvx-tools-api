import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

import { CachingService } from './caching.service';
import { CacheConfigService } from './caching-config.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService,
    }),
  ],
  providers: [
    CachingService,
    {
      provide:APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ],
  exports: [CachingService]
})
export class CachingModule { }
