// Utils.
import decryptSecret from './decryptSecret';
import encryptSecret from './encryptSecret';

describe('encryptSecret()', () => {
  const cipherKey: string = 'super_secret';

  it('should encrypt a secret', () => {
    const secret: string = 'I am a super secret';
    const encryptedSecret: string = encryptSecret(secret, cipherKey);

    expect(encryptedSecret.split(':')).toHaveLength(3);
    expect(decryptSecret(encryptedSecret, cipherKey)).toBe(secret);
  });
});
