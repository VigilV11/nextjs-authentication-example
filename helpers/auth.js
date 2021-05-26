import { hash } from 'bcryptjs';

export async function hashPassword(password) {
  const hashPassword = await hash(password, 12);
  return hashPassword;
}
