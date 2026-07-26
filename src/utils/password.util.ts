import * as bcrypt from 'bcrypt';
import { SECURITY } from '../constants/security.constant';

export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, SECURITY.BCRYPT_SALT_ROUNDS);
}

export async function comparePassword(
  plainText: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(plainText, passwordHash);
}
