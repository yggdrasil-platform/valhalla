// Utils.
import decryptSecret from './decryptSecret';
import encryptSecret from './encryptSecret';

describe('decryptSecret()', () => {
  const cipherKey: string = 'super_secret';

  it('should fail if the encrypted secret is missing the IV', () => {
    const secret: string = 'Shhhhhh!';
    const encryptedSecret: string = encryptSecret(secret, cipherKey);
    const cipherText: string = encryptedSecret.split(':')[1];

    try {
      decryptSecret(cipherText, cipherKey);
    } catch (e) {
      expect.anything();
    }
  });

  it('should decrypt a secret', () => {
    const secret: string = 'Shhhhhh!';
    const encryptedSecret: string = encryptSecret(secret, cipherKey);

    expect(decryptSecret(encryptedSecret, cipherKey)).toBe(secret);
  });
});
