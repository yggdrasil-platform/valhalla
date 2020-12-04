import { CipherGCM, createCipheriv, createHash, randomBytes } from 'crypto';

/**
 * Creates an encrypted secret hex string using the AES-256 GDM algorithm.
 * @param {string} input the secret to encrypt.
 * @param {string} key the key to use with the cipher.
 * @returns {string} an encrypted secret in the format of "iv:ciphertext:tag"
 */
export default function encryptSecret(input: string, key: string): string {
  const iv: Buffer = randomBytes(16);
  const encodedKey: Buffer = createHash('sha256').update(key).digest(); // Convert to 32 byte hash.
  const cipher: CipherGCM = createCipheriv('aes-256-gcm', encodedKey, iv);
  const encrypted: Buffer = Buffer.concat([
    cipher.update(input),
    cipher.final(),
  ]);

  return `${iv.toString('hex')}:${encrypted.toString(
    'hex'
  )}:${cipher.getAuthTag().toString('hex')}`;
}
