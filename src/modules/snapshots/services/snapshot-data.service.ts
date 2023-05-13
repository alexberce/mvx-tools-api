import { Injectable } from '@nestjs/common';

import { DailySnapshotRepository } from '../repositories';

import { AbstractSnapshot } from '../schemas';

@Injectable()
export class SnapshotDataService {
  constructor(
    private readonly dailySnapshotRepository: DailySnapshotRepository,
  ) {}

  async getTokenHolders(tokenIdentifier: string): Promise<AbstractSnapshot> {
    return this.dailySnapshotRepository.model.findOne({tokenIdentifier});
  }
}
