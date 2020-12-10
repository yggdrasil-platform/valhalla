import { AuthChecker, ResolverData } from 'type-graphql';

// Types.
import { Context } from '../../types';

const authChecker: AuthChecker<Context> = (
  { context }: ResolverData<Context>,
  roles: string[]
) => {
  const { user } = context;

  // Check if the user roles overlap the auth roles.
  if (user) {
    return (
      user.roles.length < 1 ||
      user.roles.some((value) => roles.indexOf(value.name) > -1)
    );
  }

  return false; // Otherwise, access denied.
};

export default authChecker;
