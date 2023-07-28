// player.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { PlayerDataDTO } from '../dto/player-data.dto';
import { CoachService } from 'src/coaches/services/coach.service';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private coachService: CoachService,
  ) {}

  async getPlayersByLeagueCode(leagueCode: string, teamName?: string) {
    let players: Player[] = [];

    if (teamName) {
      players = await this.playerRepository
        .createQueryBuilder('player')
        .leftJoinAndSelect('player.team', 'team')
        .leftJoinAndSelect('team.competition', 'league')
        .where('league.code = :leagueCode', { leagueCode })
        .andWhere('team.name = :teamName', { teamName })
        .getMany();
    } else {
      players = await this.playerRepository
        .createQueryBuilder('player')
        .leftJoinAndSelect('player.team', 'team')
        .leftJoinAndSelect('team.competition', 'league')
        .where('league.code = :leagueCode', { leagueCode })
        .getMany();
    }

    if (players.length > 0) {
      return players;
    } else {
      return this.coachService.getCoachesByLeagueAndTeam(leagueCode, teamName);
    }
  }

  async createPlayer(playerData: PlayerDataDTO, team: Team): Promise<void> {
    const player = this.playerRepository.create({
      name: playerData.name,
      position: playerData.position,
      dateOfBirth: playerData.dateOfBirth,
      nationality: playerData.nationality,
      team,
    });

    await this.playerRepository.save(player);
  }
}
