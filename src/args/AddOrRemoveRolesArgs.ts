import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export default class AddOrRemoveRolesAArgs {
  @Field(() => Int)
  id: number;

  @Field(() => [String])
  roles: string[];
}
