// team.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { TeamDataDTO } from '../dto/team-data.dto';
import { League } from 'src/leagues/entities/league.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async getAllTeams(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  async getTeamByName(name: string): Promise<Team> {
    return this.teamRepository.findOne({
      where: { name },
      relations: ['players'],
    });
  }

  async getTeamWithPlayersByName(name: string): Promise<Team> {
    return this.teamRepository.findOne({
      where: { name },
      relations: ['players'],
    });
  }

  async getTeamWithCoachesByName(name: string): Promise<Team> {
    return this.teamRepository.findOne({
      where: { name },
      relations: ['coach'],
    });
  }

  // team.service.ts
  async doesTeamExist(name: string): Promise<boolean> {
    const teamCount = await this.teamRepository.count({ where: { name } });
    return teamCount > 0;
  }

  async createTeam(team: TeamDataDTO, league: League): Promise<Team> {
    const newTeam = this.teamRepository.create({
      name: team.name,
      tla: team.tla,
      shortName: team.shortName,
      areaName: team.area.name,
      address: team.address,
      league: league,
    });

    return this.teamRepository.save(newTeam);
  }
}
