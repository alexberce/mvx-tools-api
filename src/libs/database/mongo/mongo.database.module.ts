import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MAIN_MONGO_DB_CONNECTION_NAME, SNAPSHOTS_MONGO_DB_CONNECTION_NAME } from "./constants";

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MAIN_MONGO_DB_HOST') as string,
        dbName: configService.get<string>('MAIN_MONGO_DB_NAME') as string,
      }),
      connectionName: MAIN_MONGO_DB_CONNECTION_NAME,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('SNAPSHOTS_MONGO_DB_HOST') as string,
        dbName: configService.get<string>('SNAPSHOTS_MONGO_DB_NAME') as string,
      }),
      connectionName: SNAPSHOTS_MONGO_DB_CONNECTION_NAME,
    }),
  ],
})
export class MongoDatabaseModule {}
