import { Response } from 'express';

// Services.
import { UserService } from '../../services';

// Types.
import { Context, Request } from '../../types';

interface ContextParams {
  req: Request;
  res: Response;
}

const context: (context: ContextParams) => Promise<Context> = async () => {
  const userService: UserService = new UserService();

  return {
    user: await userService.getById(1),
  };
};

export default context;
