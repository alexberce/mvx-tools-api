import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository, MAIN_MONGO_DB_CONNECTION_NAME } from '@/libs/database/mongo';

import { UserSnapshotConfiguration } from '../../schemas';

@Injectable()
export class UserSnapshotConfigRepository extends AbstractRepository<UserSnapshotConfiguration> {
  constructor(
    @InjectConnection(MAIN_MONGO_DB_CONNECTION_NAME) connection: Connection,
    @InjectModel(UserSnapshotConfiguration.name, MAIN_MONGO_DB_CONNECTION_NAME) public model: Model<UserSnapshotConfiguration>
  ) {
    super(model, connection);
  }
}
