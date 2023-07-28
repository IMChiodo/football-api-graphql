import { Query, Resolver, Args } from '@nestjs/graphql';
import { PlayerService } from '../services/players.service';
import { Player } from '../entities/player.entity';

@Resolver(() => Player)
export class PlayerResolver {
  constructor(private playerService: PlayerService) {}

  @Query(() => Player, { name: 'player' })
  async getPlayers(
    @Args('leagueCode') leagueCode: string,
    @Args('teamName', { nullable: true }) teamName?: string,
  ) {
    return this.playerService.getPlayersByLeagueCode(leagueCode, teamName);
  }
}
