import { Service } from 'typedi';

// Models.
import { Role } from '../models';

@Service()
export default class RoleService {
  /**
   * Gets the roles by their name.
   * @param {string[]} roles the names of the roles
   * @param {boolean} includeInactive [optional] include inactive roles. Defaults to false.
   * @returns {Role[]} all the roles or an empty string if they don't exist.
   */
  public async getRolesByNames(
    roles: string[],
    includeInactive: boolean = false
  ): Promise<Role[]> {
    return await Role.find({
      where: roles.map((name) => ({
        name,
        ...(!includeInactive && {
          active: true,
        }),
      })),
    });
  }
}
