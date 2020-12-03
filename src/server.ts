import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { json, urlencoded } from 'body-parser';
import Express, { Application } from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import { hostname } from 'os';
import { buildSchema } from 'type-graphql';
import { Connection, createConnection } from 'typeorm';
import { Logger } from 'winston';

// Configs.
import { databaseConfig } from './config';

// Constants.
import { Endpoints } from './constants';

// Middlewares.
import { errorHandler } from './middlewares';

// Modules.
import { createLogger } from './modules/logger';

// Resolvers.
import { UserResolver } from './resolvers';

// Routers.
import healthcheckRouter from './api/healthcheck/router';

// Types.
import { RouterOptions } from './types';

export class ExpressServer {
  public readonly app: Application;
  public connection: Connection;
  public graphqlServer: ApolloServer;
  public readonly logger: Logger;

  constructor() {
    this.app = Express();
    this.logger = createLogger(process.env.SERVICE_NAME, process.env.LOG_LEVEL);
  }

  /**
   * Configures the application.
   */
  public config(): void {
    // Setup middleware.
    this.app.use(
      morgan('combined', {
        stream: {
          write: (message: string) => {
            this.logger.info(message);
          },
        },
      })
    );
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));

    this.app.enable('case sensitive routing');
    this.app.enable('strict routing');
  }

  /**
   * Convenience function that simply runs Express.listen() and wraps it in a promise with logging.
   * @param {string | number} port
   */
  public listen(port: number): Promise<void> {
    return new Promise((resolve: () => void) => {
      createServer(this.app).listen(port, () => {
        this.logger.info(
          `🚀 blast off in ${
            process.env.NODE_ENV
          } @: ${hostname()} on port: ${port}}`
        );

        resolve();
      });
    });
  }

  /**
   * Sets up all the api routes.
   */
  public api(): void {
    let error: Error;
    let options: RouterOptions;

    if (!this.connection || !this.connection.isConnected) {
      error = new Error('database not connected');

      this.logger.error(error.message);

      throw error;
    }

    options = {
      connection: this.connection,
      logger: this.logger,
    };

    // Add routes.
    this.app.use(
      Endpoints.HEALTHCHECK,
      healthcheckRouter(Endpoints.HEALTHCHECK, options)
    );

    // Error handling.
    this.app.use(errorHandler(this.logger));
  }

  public async database(): Promise<void> {
    this.connection = await createConnection(databaseConfig);
  }

  public async graphql(): Promise<void> {
    let error: Error;

    if (!this.connection || !this.connection.isConnected) {
      error = new Error('database not connected');

      this.logger.error(error.message);

      throw error;
    }

    this.graphqlServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver],
      }),
    });

    this.graphqlServer.applyMiddleware({
      app: this.app,
    });
  }
}
