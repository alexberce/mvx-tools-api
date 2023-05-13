import { ApiTags } from '@nestjs/swagger';
import { Controller, Param, Req, Body, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';

import { MongooseObjectIdPipe } from '@/libs/database/mongo';

import { JwtAuthGuard } from '@/modules/auth/guards';
import { AuthenticatedRequest } from '@/modules/auth/types';

import { CreateSnapshotConfigurationDto } from '../dto';
import { SnapshotConfigurationService } from '../services';

@ApiTags('Snapshots')
@Controller('snapshots/configuration')
export class SnapshotsConfigurationController {
  constructor(
    private readonly configurationService: SnapshotConfigurationService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getSnapshotConfigurations(@Req() request: AuthenticatedRequest) {
    const { user } = request;
    return await this.configurationService.getUserConfigurations({ accountId: user._id });
  }

  @Get(':configurationId')
  @UseGuards(JwtAuthGuard)
  async getSnapshotConfiguration(
    @Req() request: AuthenticatedRequest,
    @Param('configurationId', MongooseObjectIdPipe) configurationId
  ) {
    const { user } = request;
    return this.configurationService.getConfiguration({ accountId: user._id, _id: configurationId });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createSnapshotConfiguration(@Req() request: AuthenticatedRequest, @Body() dto: CreateSnapshotConfigurationDto) {
    const { user } = request;
    return await this.configurationService.createUserConfiguration(user._id, dto);
  }

  @Put(':configurationId')
  @UseGuards(JwtAuthGuard)
  async updateSnapshotConfiguration(
    @Req() request: AuthenticatedRequest,
    @Param('configurationId', MongooseObjectIdPipe) configurationId
  ) {
    const { user } = request;
    return await this.configurationService.getUserConfigurations(user._id);
  }

  @Delete(':configurationId')
  @UseGuards(JwtAuthGuard)
  async deleteSnapshotConfiguration(
    @Req() request: AuthenticatedRequest,
    @Param('configurationId', MongooseObjectIdPipe) configurationId
  ) {
    const { user } = request;
    return await this.configurationService.deleteConfiguration({accountId: user._id, _id: configurationId});
  }
}
