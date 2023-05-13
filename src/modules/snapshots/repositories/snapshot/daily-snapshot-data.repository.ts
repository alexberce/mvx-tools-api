import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository, SNAPSHOTS_MONGO_DB_CONNECTION_NAME } from '@/libs/database/mongo';

import { DailySnapshotData } from '../../schemas';

@Injectable()
export class DailySnapshotDataRepository extends AbstractRepository<DailySnapshotData> {
  constructor(
    @InjectConnection(SNAPSHOTS_MONGO_DB_CONNECTION_NAME) connection: Connection,
    @InjectModel(DailySnapshotData.name, SNAPSHOTS_MONGO_DB_CONNECTION_NAME) public model: Model<DailySnapshotData>
  ) {
    super(model, connection);
  }
}
