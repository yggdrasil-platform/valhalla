import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';

// Args.
import { AddOrRemoveRolesArgs } from '../args';

// Constants.
import { Roles } from '../constants';

// Inputs.
import { CreateUserInput, UpdateUserInput } from '../inputs';

// Models.
import { CheckUsername, Role, User } from '../models';

// Services.
import { RoleService, UserService } from '../services';

// Types.
import { Context } from '../types';

// Utils.
import { encryptSecret } from '../utils';

@Resolver()
export default class UserResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService
  ) {}

  @Authorized([Roles.ADMIN])
  @Mutation(() => User, {
    nullable: true,
  })
  public async addRoles(
    @Args() { id, roles }: AddOrRemoveRolesArgs
  ): Promise<User | undefined> {
    const newRoles: Role[] = await this.roleService.getRolesByNames(roles);
    const user: User | undefined = await this.userService.getById(id);

    if (user) {
      user.roles = [...newRoles, ...user.roles].reduce<Role[]>(
        (acc, currentValue) =>
          !acc.find((value) => value.id === currentValue.id)
            ? [...acc, currentValue]
            : acc,
        []
      );
      user.updatedAt = new Date();

      return await user.save();
    }

    return undefined;
  }

  @Authorized([Roles.ADMIN])
  @Mutation(() => User)
  public async createUser(@Arg('input') input: CreateUserInput): Promise<User> {
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
      username: await this.userService.createUsername(username),
    });

    return await model.save();
  }

  @Query(() => CheckUsername)
  public async checkUsername(
    @Arg('username') username: string
  ): Promise<CheckUsername> {
    const user: User | undefined = await this.userService.getByUsername(
      username
    );

    return {
      isAvailable: !user,
      suggestion: await this.userService.createUsername(username),
    };
  }

  @Authorized()
  @Query(() => User, {
    nullable: true,
  })
  public async me(@Ctx() ctx: Context): Promise<User | undefined> {
    return ctx.user;
  }

  @Authorized([Roles.ADMIN])
  @Mutation(() => User, {
    nullable: true,
  })
  public async removeRoles(
    @Args() { id, roles }: AddOrRemoveRolesArgs
  ): Promise<User | undefined> {
    const removeRoles: Role[] = await this.roleService.getRolesByNames(roles);
    const user: User | undefined = await this.userService.getById(id);

    if (user) {
      user.roles = user.roles.filter(
        (role) => !removeRoles.some((value) => value.id === role.id)
      );
      user.updatedAt = new Date();

      return await user.save();
    }

    return undefined;
  }

  @Authorized()
  @Mutation(() => User, {
    nullable: true,
  })
  public async update(
    @Arg('input') input: UpdateUserInput,
    @Ctx() ctx: Context
  ): Promise<User | undefined> {
    if (ctx.user) {
      await User.update(
        {
          id: ctx.user.id,
        },
        {
          ...input,
          updatedAt: new Date(),
        }
      );

      return await this.userService.getById(ctx.user.id);
    }

    return undefined;
  }

  @Authorized([Roles.ADMIN])
  @Query(() => User, {
    nullable: true,
  })
  public async user(@Arg('id') id: number): Promise<User | undefined> {
    return await this.userService.getById(id);
  }

  @Authorized([Roles.ADMIN])
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }
}
