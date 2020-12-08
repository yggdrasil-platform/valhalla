import { Equal, Raw } from 'typeorm';

// Models.
import { User } from '../models';

/**
 * Creates a username based on the firstname and lastname concatenation. It checks
 * the database for existing username types and bumps to the latest username index, eg.
 * "firstname.lastname69"
 * @param {string} firstName the first name of the user
 * @param {string} lastName the last name of the user
 * @returns {string} the concatenation and index of the user's names and an index.
 */
export default async function createUsername(
  firstName: string,
  lastName: string
): Promise<string> {
  const username: string = `${firstName
    .replace(/[^a-zA-Z0-9]+/g, '')
    .toLowerCase()}.${lastName.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase()}`;
  let latestIndex: number | undefined;
  let matches: User[] = await User.find({
    username: Equal(username),
  });

  if (matches.length < 1) {
    return `${username}`;
  }

  matches = await User.find({
    username: Raw((alias) => `${alias} ~ '${username}\\d+'`),
  });

  latestIndex = matches
    .reduce<number[]>((acc, value) => {
      const index: number = parseInt(value.username.replace(username, ''), 10); // Get the index of this username

      if (!isNaN(index)) {
        return [...acc, index];
      }

      return acc;
    }, [])
    .sort()
    .pop();

  if (!latestIndex) {
    return `${username}1`;
  }

  return `${username}${latestIndex + 1}`;
}
