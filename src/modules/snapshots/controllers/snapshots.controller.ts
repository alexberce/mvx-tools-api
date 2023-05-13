import { ApiTags } from '@nestjs/swagger';
import {Controller, Get, Param, Req, UseGuards, UseInterceptors} from '@nestjs/common';

import { JwtAuthGuard } from '@/modules/auth/guards';
import { AuthenticatedRequest } from '@/modules/auth/types';
import { MongooseClassSerializer } from '@/libs/database/mongo';

import { AbstractSnapshot } from '../schemas';
import { SnapshotDataService, SnapshotsService } from '../services';

@ApiTags('Snapshots')
@Controller('snapshots')
export class SnapshotsController {
  constructor(
    private readonly snapshotsService: SnapshotsService,
    private readonly snapshotDataService: SnapshotDataService,
  ) {}

  @Get(':tokenIdentifier')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MongooseClassSerializer(AbstractSnapshot))
  async findByHash(@Param('tokenIdentifier') tokenIdentifier: string, @Req() request: AuthenticatedRequest) {
    return await this.snapshotDataService.getTokenHolders(tokenIdentifier);
  }

  @Get('on-demand/:tokenIdentifier')
  @UseGuards(JwtAuthGuard)
  async onDemandSnapshot(@Param('tokenIdentifier') tokenIdentifier: string, @Req() request: AuthenticatedRequest,) {
    const { user } = request;
    return await this.snapshotsService.onDemandSnapshot(user._id, tokenIdentifier);
  }
}
