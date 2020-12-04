import { CipherGCM, createCipheriv, createHash, randomBytes } from 'crypto';

/**
 * Creates an encrypted secret hex string using the AES-256 GDM algorithm.
 * @param {string} input the secret to encrypt.
 * @param {string} key the key to use with the cipher.
 * @returns {string} an encrypted secret in the format of "iv:ciphertext:tag"
 */
export default function encryptSecret(input: string, key?: string): string {
  let iv: Buffer;
  let encodedKey: Buffer;
  let cipher: CipherGCM;
  let encrypted: Buffer;

  if (!key) {
    throw new Error('failed to encrypt secret: key is undefined');
  }

  iv = randomBytes(16);
  encodedKey = createHash('sha256').update(key).digest(); // Convert to 32 byte hash.
  cipher = createCipheriv('aes-256-gcm', encodedKey, iv);
  encrypted = Buffer.concat([cipher.update(input), cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString(
    'hex'
  )}:${cipher.getAuthTag().toString('hex')}`;
}
