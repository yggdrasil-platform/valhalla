import { Equal, Raw } from 'typeorm';

// Models.
import { User } from '../models';

/**
 * Checks if the provided username can be created. If the username exists, it appends
 * an index to it.
 * @param {string} username the username to create
 * @returns {string} the provided username, or the username with an index.
 */
export default async function createUsername(
  username: string
): Promise<string> {
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
