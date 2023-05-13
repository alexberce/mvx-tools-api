import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IndexerModule } from '@/libs/blockchain/mvx/indexer';
import { MAIN_MONGO_DB_CONNECTION_NAME, SNAPSHOTS_MONGO_DB_CONNECTION_NAME } from '@/libs/database/mongo/constants';

import { SnapshotsController, SnapshotsConfigurationController } from './controllers';
import { SnapshotConfigurationService, SnapshotDataService, SnapshotsService } from './services';

import {
  DailySnapshot,
  DailySnapshotData,
  OnDemandSnapshot,
  OnDemandSnapshotData,
  UserSnapshotConfiguration,
  SharedSnapshotConfiguration,
  DailySnapshotSchema,
  DailySnapshotDataSchema,
  OnDemandSnapshotSchema,
  OnDemandSnapshotDataSchema,
  UserSnapshotConfigurationSchema,
  SharedSnapshotConfigurationSchema,
} from './schemas';

import {
  DailySnapshotRepository,
  DailySnapshotDataRepository,
  OnDemandSnapshotRepository,
  OnDemandSnapshotDataRepository,
  SharedSnapshotConfigRepository,
  UserSnapshotConfigRepository,
} from './repositories';

@Module({
  imports: [
    IndexerModule,

    MongooseModule.forFeature([
      { name: DailySnapshotData.name, schema: DailySnapshotDataSchema },
      { name: OnDemandSnapshotData.name, schema: OnDemandSnapshotDataSchema },
    ], SNAPSHOTS_MONGO_DB_CONNECTION_NAME),

    MongooseModule.forFeature([
      { name: DailySnapshot.name, schema: DailySnapshotSchema },
      { name: OnDemandSnapshot.name, schema: OnDemandSnapshotSchema },
      { name: UserSnapshotConfiguration.name, schema: UserSnapshotConfigurationSchema },
      { name: SharedSnapshotConfiguration.name, schema: SharedSnapshotConfigurationSchema },
    ], MAIN_MONGO_DB_CONNECTION_NAME),
  ],
  providers: [
    SnapshotsService,
    SnapshotDataService,
    SnapshotConfigurationService,

    UserSnapshotConfigRepository,
    SharedSnapshotConfigRepository,

    DailySnapshotRepository,
    DailySnapshotDataRepository,
    OnDemandSnapshotRepository,
    OnDemandSnapshotDataRepository,
  ],
  controllers: [SnapshotsConfigurationController, SnapshotsController],
  exports: [SnapshotsService, SnapshotDataService, SnapshotConfigurationService]
})
export default class SnapshotsModule {}
