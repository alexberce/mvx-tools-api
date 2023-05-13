import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '@/config/validation';
import { CachingModule } from '@/libs/caching';
import { DatabaseProvidersModule } from "@/libs/database";

import AuthModule from '@/modules/auth/auth.module';
import SnapshotsModule from '@/modules/snapshots/snapshots.module';

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
    SnapshotsModule,
  ],
})
export default class AppModule {}
