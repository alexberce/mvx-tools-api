import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/** Local Imports **/
import { validate } from '@/config/validation';
import { DatabaseProvidersModule } from "@/libs/database";

@Module({
  imports: [
    /** Common Modules **/
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),

    DatabaseProvidersModule,
  ],
})
export default class AppModule {}
