import { IUserExistReturn } from '../app/modules/auth/auth.interface';
import prisma from '../shared/prisma';

async function isUserExist(email: string): Promise<IUserExistReturn | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, password: true },
  });

  return user;
}
export default isUserExist;
