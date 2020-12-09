import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';

// Constants.
import { Roles } from '../constants';

// Inputs.
import { CreateUserInput } from '../inputs';

// Models.
import { CheckUsername, User } from '../models';

// Types.
import { Context } from '../types';

// Utils.
import { createUsername, encryptSecret } from '../utils';

@Resolver()
export default class UserResolver {
  @Authorized([Roles.ADMIN])
  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput): Promise<User> {
    const username: string = `${input.firstName
      .replace(/[^a-zA-Z0-9]+/g, '')
      .toLowerCase()}.${input.lastName
      .replace(/[^a-zA-Z0-9]+/g, '')
      .toLowerCase()}`;
    const model: User = User.create<User>({
      ...input,
      createdAt: new Date(),
      password: encryptSecret(input.password, process.env.ENCRYPTION_KEY),
      updatedAt: new Date(),
      username: await createUsername(username),
    });

    return await model.save();
  }

  @Query(() => CheckUsername)
  async checkUsername(
    @Arg('username') username: string
  ): Promise<CheckUsername> {
    const user: User | undefined = await User.findOne({
      where: {
        username,
      },
    });

    return {
      isAvailable: !user,
      suggestion: await createUsername(username),
    };
  }

  @Authorized()
  @Query(() => User, {
    nullable: true,
  })
  async me(@Ctx() ctx: Context): Promise<User | undefined> {
    return ctx.user;
  }

  @Authorized([Roles.ADMIN])
  @Query(() => User, {
    nullable: true,
  })
  async user(@Arg('id') id: number): Promise<User | undefined> {
    return await User.findOne({
      where: {
        id,
      },
    });
  }

  @Authorized([Roles.ADMIN])
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }
}
