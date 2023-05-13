import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/** Local Imports **/
import { validate } from '@/config/validation';

@Module({
  imports: [
    /** Common Modules **/
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
  ],
})
export default class AppModule {}
