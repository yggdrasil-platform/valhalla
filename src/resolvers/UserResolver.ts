import { Arg, Mutation, Query, Resolver } from 'type-graphql';

// Inputs.
import { UserInput } from '../inputs';

// Models.
import { User } from '../models';

@Resolver()
export default class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg('input') input: UserInput): Promise<User> {
    const model: User = User.create(input);

    return await model.save();
  }

  @Query(() => User)
  async user(@Arg('id') id: number): Promise<User | undefined> {
    return await User.findOne({ where: { id } });
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }
}
