import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TeamInclude {
  @Field({ defaultValue: false })
  players: boolean;

  @Field({ defaultValue: false })
  coaches: boolean;
}
