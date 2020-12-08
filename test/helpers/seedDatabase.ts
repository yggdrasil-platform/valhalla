import { existsSync } from 'fs';
import { join } from 'path';
import { Connection } from 'typeorm';

export default async function seedDatabase(
  connection: Connection
): Promise<void> {
  let seed: any;
  let seedFilePath: string;

  for (const entityMetadata of connection.entityMetadatas) {
    await connection
      .createQueryBuilder()
      .delete()
      .from(entityMetadata.name)
      .execute();
    await connection.query(
      `ALTER SEQUENCE ${entityMetadata.tableName}_id_seq RESTART;`
    );

    seedFilePath = join(
      process.cwd(),
      'test',
      'seeds',
      `${entityMetadata.tableName}.json`
    );

    if (existsSync(seedFilePath)) {
      seed = require(seedFilePath);

      await connection
        .createQueryBuilder()
        .insert()
        .into(entityMetadata.name)
        .values(seed)
        .execute();
    }
  }
}
