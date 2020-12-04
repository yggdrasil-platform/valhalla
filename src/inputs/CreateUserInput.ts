import { Field, InputType } from 'type-graphql';

// Models.
import { User } from '../models';

@InputType()
export default class CreateUserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;
}
