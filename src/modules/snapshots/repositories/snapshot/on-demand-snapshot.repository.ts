import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository, MAIN_MONGO_DB_CONNECTION_NAME } from '@/libs/database/mongo';

import { OnDemandSnapshot } from '../../schemas';

@Injectable()
export class OnDemandSnapshotRepository extends AbstractRepository<OnDemandSnapshot> {
  constructor(
    @InjectConnection(MAIN_MONGO_DB_CONNECTION_NAME) connection: Connection,
    @InjectModel(OnDemandSnapshot.name, MAIN_MONGO_DB_CONNECTION_NAME) public model: Model<OnDemandSnapshot>
  ) {
    super(model, connection);
  }
}
