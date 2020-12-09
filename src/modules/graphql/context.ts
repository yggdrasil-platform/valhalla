import { Response } from 'express';

// Models.
import { User } from '../../models';

// Types.
import { Context, Request } from '../../types';

interface ContextParams {
  req: Request;
  res: Response;
}

const context: (context: ContextParams) => Promise<Context> = async () => {
  return {
    user: await User.findOne({
      relations: ['roles'],
      where: {
        id: 1,
      },
    }),
  };
};

export default context;
