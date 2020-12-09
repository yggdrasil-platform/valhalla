import { Connection } from 'typeorm';

// Constants.
import { Roles } from '../constants';

// Models.
import { Role } from '../models';

const data: Partial<Role>[] = [
  {
    active: true,
    name: Roles.ADMIN,
  },
];

export async function run(connection: Connection): Promise<void> {
  const roles: Role[] = await connection
    .getRepository(Role)
    .createQueryBuilder('role')
    .getMany();

  // Update and existing data.
  for (const role of data) {
    if (roles.find((value) => value.name === role.name)) {
      await connection
        .createQueryBuilder()
        .update(Role)
        .set(role)
        .where('name = :name', {
          name: role.name,
        })
        .execute();
    }
  }

  // Finally, insert any new data.
  await connection
    .createQueryBuilder()
    .insert()
    .into(Role)
    .values(
      data.reduce<Partial<Role>[]>((acc, currentValue) => {
        if (!roles.find((value) => value.name === currentValue.name)) {
          return [...acc, currentValue];
        }

        return acc;
      }, [])
    )
    .execute();
}
