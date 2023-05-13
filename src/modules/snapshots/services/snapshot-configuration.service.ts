import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { SnapshotStatus } from '../enums';
import { CreateSnapshotConfigurationDto } from '../dto';
import { SharedSnapshotConfiguration, UserSnapshotConfiguration } from '../schemas';
import { SharedSnapshotConfigRepository, UserSnapshotConfigRepository } from '../repositories';

@Injectable()
export class SnapshotConfigurationService {
  constructor(
    private readonly userSnapshotConfigRepository: UserSnapshotConfigRepository,
    private readonly sharedSnapshotConfigRepository: SharedSnapshotConfigRepository,
  ) {}

  async getUserConfigurations(filter: Partial<UserSnapshotConfiguration>): Promise<UserSnapshotConfiguration[]> {
    return this.userSnapshotConfigRepository.model.find(filter);
  }

  async getConfiguration(filter: Partial<UserSnapshotConfiguration>) {
    return this.userSnapshotConfigRepository.model.findOne(filter).orFail();
  }

  async createUserConfiguration(accountId: Types.ObjectId, dto: CreateSnapshotConfigurationDto) {
    const data = { accountId, ...dto } as Partial<UserSnapshotConfiguration>;

    const session = await this.userSnapshotConfigRepository.startTransaction();

    try {
      const userConfiguration: UserSnapshotConfiguration = await this.userSnapshotConfigRepository.model.create(data);
      await this.createSharedConfiguration(dto);

      await session.commitTransaction();
      await session.endSession();

      return userConfiguration;
    } catch (error) {
      await session.endSession();
    }
  }

  async updateConfiguration(filter: Partial<UserSnapshotConfiguration>, dto: CreateSnapshotConfigurationDto): Promise<UserSnapshotConfiguration> {
    return this.userSnapshotConfigRepository.model.findOneAndUpdate(filter, dto, { new: true });
  }

  async deleteConfiguration(filter: Partial<UserSnapshotConfiguration>) {
    const session = await this.userSnapshotConfigRepository.startTransaction();

    try {
      const deletedConfiguration = await this.userSnapshotConfigRepository.model.findByIdAndDelete(filter);

      const sharedConfigurationFilter = { tokenIdentifier: deletedConfiguration.tokenIdentifier, frequency: deletedConfiguration.frequency };
      const sharedConfigurationUpdate = { $inc: { requestCount: -1 } };

      await this.sharedSnapshotConfigRepository.model.findOneAndUpdate(sharedConfigurationFilter, sharedConfigurationUpdate);

      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.endSession();
    }
  }

  async getSharedConfigurations(filter: Partial<SharedSnapshotConfiguration>): Promise<SharedSnapshotConfiguration[]> {
    return this.sharedSnapshotConfigRepository.model.find(this.getFiltersForSharedSnapshotsCronJob(filter));
  }

  async getOneSharedConfigurationsForCronJob(filter: Partial<SharedSnapshotConfiguration>): Promise<SharedSnapshotConfiguration> {
    return this.sharedSnapshotConfigRepository.model.findOne(this.getFiltersForSharedSnapshotsCronJob(filter));
  }

  async createSharedConfiguration(dto: CreateSnapshotConfigurationDto) {
    const filterData = {tokenIdentifier: dto.tokenIdentifier, frequency: dto.frequency};
    const updateOptions = { new: true, upsert: true };

    const partialDto = {
      frequency: dto.frequency,
      tokenIdentifier: dto.tokenIdentifier,
    } as Partial<SharedSnapshotConfiguration>;

    const upsertData = {
      ...partialDto,
      $inc: {
        requestCount: 1,
      }
    };

    return this.sharedSnapshotConfigRepository.model.findOneAndUpdate(filterData, upsertData, updateOptions);
  }

  async finishSharedConfigurationSnapshot(id: Types.ObjectId, date: Date) {
    await this.sharedSnapshotConfigRepository.model.findOneAndUpdate(id, {lastExecuted: date});
  }

  async reQueueSharedConfigurationSnapshot(id: Types.ObjectId) {
    await this.sharedSnapshotConfigRepository.model.findOneAndUpdate(id, {status: SnapshotStatus.Idle});
  }

  private getFiltersForSharedSnapshotsCronJob(partialDocument: Partial<SharedSnapshotConfiguration>) {
    return {
      ...partialDocument,
      status: {
        $ne: SnapshotStatus.InProgress,
      },
      lastExecuted: {
        $lte: this.getPreviousDay(),
      }
    };
  }

  private getPreviousDay(): Date {
    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);
    previousDay.setHours(23);
    previousDay.setMinutes(59);
    previousDay.setSeconds(59);

    return previousDay;
  }
}
