import { db } from '@/db/database';
import { SelectUser } from '@/db/schema';

export const getUserIDFromEamil = async (email: string) => {
  const user = await db
    .selectFrom('User')
    .selectAll()
    .where('User.email', '=', email)
    .executeTakeFirstOrThrow();
  return user;
};
