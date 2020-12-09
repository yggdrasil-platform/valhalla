import { Field, InputType } from 'type-graphql';

// Models.
import { User } from '../models';

@InputType()
export default class CreateUserInput implements Partial<User> {
  @Field(() => String)
  email: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  password: string;
}
