import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from '../entities/league.entity';
import { lastValueFrom } from 'rxjs';
import { TeamService } from 'src/teams/services/teams.service';
import { PlayerService } from 'src/players/services/players.service';
import { CoachService } from 'src/coaches/services/coach.service';
import { Throttle } from '@nestjs/throttler';

@Injectable()
export class LeagueService {
  constructor(
    private httpService: HttpService,
    private teamService: TeamService,
    private playerService: PlayerService,
    private coachService: CoachService,
    @InjectRepository(League)
    private leagueRepository: Repository<League>,
  ) {}

  @Throttle(10, 60)
  async importLeague(leagueCode: string) {
    const leagueResponse = await lastValueFrom(
      this.httpService.get(
        `http://api.football-data.org/v4/competitions/${leagueCode}`,
        {
          headers: {
            'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY,
          },
        },
      ),
    );
    const leagueData = leagueResponse.data;

    const league = this.leagueRepository.create({
      name: leagueData.name,
      code: leagueData.code,
      areaName: leagueData.area.name,
    });

    const savedLeague = await this.leagueRepository.save(league);

    const teamsResponse = await lastValueFrom(
      this.httpService.get(
        `http://api.football-data.org/v4/competitions/${leagueCode}/teams`,
        {
          headers: {
            'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY,
          },
        },
      ),
    );
    const teamsData = teamsResponse.data;

    for (const teamData of teamsData.teams) {
      if (!(await this.teamService.doesTeamExist(teamData.name))) {
        const team = await this.teamService.createTeam(teamData, savedLeague);
        console.log(teamData);

        if (teamData.squad.length > 0) {
          for (const playerData of teamData.squad) {
            await this.playerService.createPlayer(playerData, team);
          }
        } else {
          const coachData = { ...teamData.coach };
          await this.coachService.createCoach(coachData, team);
        }
      }
    }
  }
}
