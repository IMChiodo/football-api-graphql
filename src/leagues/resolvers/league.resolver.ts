import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LeagueService } from '../services/league.service';
import { League } from '../entities/league.entity';

@Resolver(() => League)
export class LeagueResolver {
  constructor(private leagueService: LeagueService) {}

  @Mutation(() => Boolean, { name: 'importLeague' })
  async importLeague(@Args('leagueCode') leagueCode: string) {
    await this.leagueService.importLeague(leagueCode);
    return true;
  }
}
