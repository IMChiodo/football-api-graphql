import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Person } from 'src/shared/types/person.interface';

@ObjectType()
@Entity()
export class Player extends Person {
  @Column({ nullable: true })
  @Field({ nullable: true })
  position: string;

  @ManyToOne(() => Team, (team) => team.players)
  @Field((type) => Team)
  team: Team;
}
