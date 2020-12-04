import { Application } from 'express';
import { agent } from 'supertest';
import { Connection } from 'typeorm';

// Constants.
import { Endpoints } from '../../constants';

// Helpers.
import { setupServer } from '../../../test/helpers';

interface Scope {
  app: Application;
  connection: Connection;
}

describe(Endpoints.HEALTHCHECK, () => {
  let scope: Scope;

  beforeEach(async () => {
    const { app, connection } = await setupServer();

    scope = {
      app,
      connection,
    };
  });

  afterEach(async () => {
    await scope.connection.close();
  });

  describe(`GET ${Endpoints.HEALTHCHECK}`, () => {
    it('should return a 200', async () => {
      await agent(scope.app).get(Endpoints.HEALTHCHECK).expect(200);
    });
  });
});
