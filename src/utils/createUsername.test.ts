import { Connection } from 'typeorm';

// Helpers.
import { seedDatabase, setupServer } from '../../test/helpers';

// Utils.
import createUsername from './createUsername';

interface Scope {
  connection: Connection;
}

describe('utils/createUsername()', () => {
  let scope: Scope;

  beforeEach(async () => {
    const { connection } = await setupServer();

    await seedDatabase(connection);

    scope = {
      connection,
    };
  });

  afterEach(async () => {
    await scope.connection.close();
  });

  it('should create a new username if the names are unique', async () => {
    const firstName: string = 'not';
    const lastName: string = 'known';

    expect(await createUsername(firstName, lastName)).toBe(
      `${firstName}.${lastName}`
    );
  });

  it('should add a "1" to the username if it exists', async () => {
    const firstName: string = 'loki';
    const lastName: string = 'odinson';

    expect(await createUsername(firstName, lastName)).toBe(
      `${firstName}.${lastName}1`
    );
  });

  it('should increment the username if a numbered username exists', async () => {
    const firstName: string = 'thor';
    const lastName: string = 'odinson';

    expect(await createUsername(firstName, lastName)).toBe(
      `${firstName}.${lastName}2`
    );
  });
});
