import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { League } from '../../leagues/entities/league.entity';
import { Player } from '../../players/entities/player.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Coach } from 'src/coaches/entities/coach.entity';

@ObjectType()
@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tla: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  shortName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  areaName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address: string;

  @OneToOne(() => Coach, (coach) => coach.team)
  @Field((type) => [Coach], { nullable: true })
  coach: Coach;

  @ManyToOne(() => League, (league) => league.teams)
  @Field((type) => League)
  league: League;

  @OneToMany(() => Player, (player) => player.team)
  @Field((type) => [Player], { nullable: true })
  players: Player[];
}
