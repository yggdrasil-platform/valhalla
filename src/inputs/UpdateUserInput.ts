import { Field, InputType } from 'type-graphql';

// Models.
import { User } from '../models';

@InputType()
export default class UpdateUserInput implements Partial<User> {
  @Field(() => String, {
    nullable: true,
  })
  email?: string;

  @Field(() => String, {
    nullable: true,
  })
  firstName?: string;

  @Field(() => String, {
    nullable: true,
  })
  lastName?: string;

  @Field(() => [String], {
    nullable: true,
  })
  roles?: string[];

  @Field(() => String, {
    nullable: true,
  })
  username?: string;
}
