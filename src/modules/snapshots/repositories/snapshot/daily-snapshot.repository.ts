import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository, MAIN_MONGO_DB_CONNECTION_NAME } from '@/libs/database/mongo';

import { DailySnapshot } from '../../schemas';

@Injectable()
export class DailySnapshotRepository extends AbstractRepository<DailySnapshot> {
  constructor(
    @InjectConnection(MAIN_MONGO_DB_CONNECTION_NAME) connection: Connection,
    @InjectModel(DailySnapshot.name, MAIN_MONGO_DB_CONNECTION_NAME) public model: Model<DailySnapshot>
  ) {
    super(model, connection);
  }
}
