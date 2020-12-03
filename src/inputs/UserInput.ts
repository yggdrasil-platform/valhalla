import { Field, InputType } from 'type-graphql';

@InputType()
export default class UserInput {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
