import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
async function hashPassword(user: User): Promise<User> {
  if (user.password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  }
  return user;
}
export default hashPassword;
