import { Arg, Mutation, Query, Resolver } from 'type-graphql';

// Inputs.
import { CreateUserInput } from '../inputs';

// Models.
import { User } from '../models';

// Utils.
import { createUsername, encryptSecret } from '../utils';

@Resolver()
export default class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput): Promise<User> {
    const model: User = User.create<User>({
      ...input,
      password: encryptSecret(input.password, process.env.ENCRYPTION_KEY),
      username: await createUsername(input.firstName, input.lastName),
    });

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
