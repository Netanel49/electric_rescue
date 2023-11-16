import { db } from './database';

export const getAllRequestsWithUserData = async (
  offset: number,
  limit: number,
) =>
  await db
    .selectFrom('RequestRescue')
    .innerJoin('User', 'User.id', 'RequestRescue.userId')
    .select([
      'User.id as userId',
      'RequestRescue.additionalInfo',
      'RequestRescue.id',
      'RequestRescue.latitude',
      'RequestRescue.longitude',
      'RequestRescue.phoneNumber',
      'RequestRescue.timeStamp',
      'RequestRescue.updatedAt',
      'RequestRescue.status',
      'User.name',
      'User.image',
      'User.email',
    ])
    .offset(offset)
    .limit(limit)
    .execute();
