import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '@/config/validation';
import { CachingModule } from '@/libs/caching';
import { DatabaseProvidersModule } from "@/libs/database";
import AuthModule from '@/modules/auth/auth.module';

@Module({
  imports: [
    /** Common Modules **/
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),

    CachingModule,
    DatabaseProvidersModule,

    AuthModule,
  ],
})
export default class AppModule {}
