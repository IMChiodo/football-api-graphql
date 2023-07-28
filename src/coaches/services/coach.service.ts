// player.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { Coach } from '../entities/coach.entity';
import { CoachDataDTO } from '../dto/coach-data.dto';

@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
  ) {}

  async getCoachesByLeagueAndTeam(
    leagueCode: string,
    teamName?: string,
  ): Promise<Coach[]> {
    let coaches = [];
    if (teamName) {
      coaches = await this.coachRepository
        .createQueryBuilder('coach')
        .leftJoinAndSelect('coach.team', 'team')
        .leftJoinAndSelect('team.competition', 'league')
        .where('league.code = :leagueCode', { leagueCode })
        .andWhere('team.name = :teamName', { teamName })
        .getMany();
    } else {
      coaches = await this.coachRepository
        .createQueryBuilder('coach')
        .leftJoinAndSelect('coach.team', 'team')
        .leftJoinAndSelect('team.competition', 'league')
        .where('league.code = :leagueCode', { leagueCode })
        .getMany();
    }

    return coaches;
  }

  async createCoach(coachData: CoachDataDTO, team: Team): Promise<void> {
    const coach = this.coachRepository.create({
      name: coachData.name,
      dateOfBirth: coachData.dateOfBirth,
      nationality: coachData.nationality,
      team,
    });

    await this.coachRepository.save(coach);
  }
}
