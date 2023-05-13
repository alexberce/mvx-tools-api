import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '@/config/validation';
import { CachingModule } from '@/libs/caching';
import { DatabaseProvidersModule } from "@/libs/database";

@Module({
  imports: [
    /** Common Modules **/
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),

    CachingModule,
    DatabaseProvidersModule,
  ],
})
export default class AppModule {}
