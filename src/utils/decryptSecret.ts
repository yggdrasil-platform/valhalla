import { createDecipheriv, createHash, DecipherGCM } from 'crypto';

/**
 * Decrypts an encrypted secret.
 * @param {string} input the encrypted secret in the format of "iv:ciphertext:tag"
 * @param {string} key the key used in the cipher.
 * @returns {string} the decrypted secret.
 */
export default function decryptSecret(
  input: string,
  key: string
): never | string {
  const encryptedArray: string[] = input.split(':');
  let authTag: Buffer;
  let cipherText: Buffer;
  let decipher: DecipherGCM;
  let encodedKey: Buffer;
  let iv: Buffer;

  if (encryptedArray.length < 3 || encryptedArray.length > 3) {
    throw new Error('Malformed secret');
  }

  authTag = Buffer.from(encryptedArray[2], 'hex');
  cipherText = Buffer.from(encryptedArray[1], 'hex');
  encodedKey = createHash('sha256').update(key).digest(); // Convert to 32 byte hash.
  iv = Buffer.from(encryptedArray[0], 'hex');
  decipher = createDecipheriv('aes-256-gcm', encodedKey, iv);

  decipher.setAuthTag(authTag);

  return Buffer.concat([
    decipher.update(cipherText),
    decipher.final(),
  ]).toString();
}
