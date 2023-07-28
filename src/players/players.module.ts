import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService } from './services/players.service';
import { PlayerResolver } from './resolvers/players.resolver';
import { Player } from './entities/player.entity';
import { CoachModule } from 'src/coaches/coaches.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), CoachModule],
  providers: [PlayerService, PlayerResolver],
  exports: [PlayerService],
})
export class PlayersModule {}
