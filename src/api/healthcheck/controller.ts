import { Request, Response } from 'express';

// Controllers.
import BaseController from '../base/controller';

export default class Controller extends BaseController {
  public get(req: Request, res: Response): void {
    res.status(200).json({
      environment: process.env.NODE_ENV,
      isDatabaseConnected: this.connection.isConnected,
      name: process.env.SERVICE_NAME,
      version: process.env.VERSION,
    });
  }
}
