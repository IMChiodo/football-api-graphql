import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Person } from 'src/shared/types/person.interface';

@ObjectType()
@Entity()
export class Coach extends Person {
  @ManyToOne(() => Team, (team) => team.coach)
  @Field((type) => Team)
  team: Team;
}
