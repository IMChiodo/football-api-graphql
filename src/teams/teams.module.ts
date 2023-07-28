import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamResolver } from './resolvers/teams.resolver';
import { TeamService } from './services/teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamService, TeamResolver],
  exports: [TeamService],
})
export class TeamsModule {}
