import { Field, ObjectType } from '@nestjs/graphql';
import { Team } from 'src/teams/entities/team.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class League {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  code: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  areaName: string;

  @OneToMany(() => Team, (team) => team.league)
  @Field((type) => [Team])
  teams: Team[];
}
