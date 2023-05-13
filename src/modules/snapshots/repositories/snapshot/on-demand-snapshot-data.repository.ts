import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository, SNAPSHOTS_MONGO_DB_CONNECTION_NAME } from '@/libs/database/mongo';

import { OnDemandSnapshotData } from '../../schemas';

@Injectable()
export class OnDemandSnapshotDataRepository extends AbstractRepository<OnDemandSnapshotData> {
  constructor(
    @InjectConnection(SNAPSHOTS_MONGO_DB_CONNECTION_NAME) connection: Connection,
    @InjectModel(OnDemandSnapshotData.name, SNAPSHOTS_MONGO_DB_CONNECTION_NAME) public model: Model<OnDemandSnapshotData>
  ) {
    super(model, connection);
  }
}
