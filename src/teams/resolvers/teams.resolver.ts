import { Query, Resolver, Args } from '@nestjs/graphql';
import { TeamService } from '../services/teams.service';
import { Team } from '../entities/team.entity';
import { TeamInclude } from '../input-types/include.input';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private teamService: TeamService) {}

  @Query(() => Team, { name: 'team' })
  async getTeam(
    @Args('name') name: string,
    @Args({ name: 'include', type: () => TeamInclude, nullable: true })
    include: TeamInclude,
  ) {
    if (include?.players) {
      return this.teamService.getTeamWithPlayersByName(name);
    }

    if (include?.coaches) {
      return this.teamService.getTeamWithCoachesByName(name);
    }

    return this.teamService.getTeamByName(name);
  }
}
