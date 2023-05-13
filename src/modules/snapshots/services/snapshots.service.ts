import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { AccountTokensIndex } from '@/libs/blockchain/mvx/indexer';
import { AbstractDocument, AbstractRepository } from '@/libs/database/mongo';

import { SnapshotItemData } from '../models/snapshot-item-data';
import { OnDemandSnapshot, AbstractSnapshot, SnapshotConfiguration, AbstractSnapshotData } from '../schemas';

import { DailySnapshotRepository, DailySnapshotDataRepository, OnDemandSnapshotRepository, OnDemandSnapshotDataRepository } from '../repositories';

@Injectable()
export class SnapshotsService {
  private static CHUNK_SIZE = 2000;

  constructor(
    private readonly indexer: AccountTokensIndex,
    private readonly dailySnapshotRepository: DailySnapshotRepository,
    private readonly dailySnapshotDataRepository: DailySnapshotDataRepository,
    private readonly onDemandSnapshotRepository: OnDemandSnapshotRepository,
    private readonly onDemandSnapshotDataRepository: OnDemandSnapshotDataRepository,
  ) {}

  async onDemandSnapshot(accountId: Types.ObjectId, tokenIdentifier: string): Promise<Partial<AbstractSnapshot>> {
    const chunkSize = SnapshotsService.CHUNK_SIZE;
    const data = await this.indexer.getTokenHolders(tokenIdentifier);

    const preparedData = data.map(item => {
      return {
        address: item.address,
        balanceString: item.balanceString,
        balanceNumber: item.balanceNumber
      } as SnapshotItemData
    });

    const model = {
      chunkSize: chunkSize,
      accountId: accountId,
      tokenIdentifier: tokenIdentifier,
      uniqueHolders: preparedData.length,
    } as Partial<OnDemandSnapshot>;

    const snapshot = await this.onDemandSnapshotRepository.model.create(model);
    await this.saveSnapshotData(preparedData, snapshot._id, chunkSize, this.onDemandSnapshotDataRepository);

    return {
      data: preparedData,
      uniqueHolders: data.length,
    } as Partial<AbstractSnapshot>;
  }

  async takeSharedTokenSnapshot(config: SnapshotConfiguration): Promise<AbstractSnapshot> {
    const chunkSize = SnapshotsService.CHUNK_SIZE;
    const data = await this.indexer.getTokenHolders(config.tokenIdentifier);

    const preparedData = data.map(item => {
      return {
        address: item.address,
        balanceString: item.balanceString,
        balanceNumber: item.balanceNumber
      } as SnapshotItemData
    });

    const model = {
      uniqueHolders: preparedData.length,
      snapshotConfigId: config._id,
      tokenIdentifier: config.tokenIdentifier,
      chunkSize: chunkSize,
    } as Partial<AbstractSnapshot>;

    const snapshot = await this.dailySnapshotRepository.model.create(model);
    await this.saveSnapshotData(preparedData, snapshot._id, chunkSize, this.dailySnapshotDataRepository);

    return snapshot;
  }

  private async saveSnapshotData<T extends AbstractDocument>(
    data: SnapshotItemData[],
    snapshotId: Types.ObjectId,
    chunkSize: number,
    snapshotDataRepository: AbstractRepository<T>
  ) {
    for (let i = 0; i < data.length; i += chunkSize) {
      const dataModel = {
        snapshotId: snapshotId,
        data: data.slice(i, i + chunkSize),
      } as Partial<AbstractSnapshotData>;

      await snapshotDataRepository.model.create(dataModel);
    }
  }
}
