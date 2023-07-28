import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { LeagueService } from './services/league.service';
import { LeagueResolver } from './resolvers/league.resolver';
import { HttpModule } from '@nestjs/axios';
import { TeamsModule } from 'src/teams/teams.module';
import { PlayersModule } from 'src/players/players.module';
import { CoachModule } from 'src/coaches/coaches.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([League]),
    HttpModule,
    TeamsModule,
    PlayersModule,
    CoachModule,
  ],
  providers: [LeagueService, LeagueResolver],
  exports: [LeagueService],
})
export class LeagueModule {}
