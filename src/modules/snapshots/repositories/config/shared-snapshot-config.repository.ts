import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository, MAIN_MONGO_DB_CONNECTION_NAME } from '@/libs/database/mongo';

import { SharedSnapshotConfiguration } from '../../schemas';

@Injectable()
export class SharedSnapshotConfigRepository extends AbstractRepository<SharedSnapshotConfiguration> {
  constructor(
    @InjectConnection(MAIN_MONGO_DB_CONNECTION_NAME) connection: Connection,
    @InjectModel(SharedSnapshotConfiguration.name, MAIN_MONGO_DB_CONNECTION_NAME) public model: Model<SharedSnapshotConfiguration>
  ) {
    super(model, connection);
  }
}
