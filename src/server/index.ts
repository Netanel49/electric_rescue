import { z } from 'zod';
import { priveteProcedure, publicProcedure, createTRPCRouter } from './trpc';
import { db } from '../db/database';
import { NewRequestRescue, RequestRescueUpdate } from '@/db/schema';
import { TRPCError } from '@trpc/server';
import { getUserIDFromEamil } from './utils/userUtils';
import { getServerAuthSession } from './auth';
import { getAllRequestsWithUserData } from '@/db/functions';

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
export const appRouter = createTRPCRouter({
  getMe: publicProcedure.query(async opts => {
    const me = await db
      .selectFrom('User')
      .selectAll()
      .where('email', '=', opts.ctx.session?.user?.email!)
      .executeTakeFirst();
    console.log('🚀 ~ file: index.ts:20 ~ me:', me);
    return me;
  }),
  getMeWithRescues: publicProcedure.query(async opts => {
    //TODO fix
    const meWithRescues = await db
      .selectFrom('User')
      .where('email', '=', opts.ctx.session?.user?.email!)
      .leftJoin('RequestRescue', 'User.id', 'RequestRescue.userId')
      .selectAll()
      .execute();
    console.log('🚀 ~ file: index.ts:22 ~ meWithRescues:', meWithRescues);
    return meWithRescues;
  }),
  makeMeAdmin: priveteProcedure.mutation(async opts => {
    const usersession = await getServerAuthSession();
    if (opts.ctx.session?.user?.email) {
      const user = await getUserIDFromEamil(opts.ctx.session.user.email);
      await db
        .insertInto('UserRole')
        .values({ userId: user.id, role: 'admin' })
        .onConflict(oc => oc.column('userId').doUpdateSet({ role: 'admin' }))

        .execute();
    }
    if (usersession !== null) {
      const user = await getUserIDFromEamil(usersession.user?.email!);
      await db
        .insertInto('UserRole')
        .values({ userId: user.id, role: 'admin' })
        .onConflict(oc => oc.column('userId').doUpdateSet({ role: 'admin' }))
        .execute();
    }
  }),
  addRescue: priveteProcedure
    .input(z.custom<NewRequestRescue>())
    .mutation(async opts => {
      await db
        .insertInto('RequestRescue')
        .values(opts.input)
        .executeTakeFirstOrThrow();
      return true;
    }),
  getAllRescues: priveteProcedure
    .input(
      z.object({
        limit: z.number(),
        offset: z.number(),
      }),
    )
    .query(async opts =>
      getAllRequestsWithUserData(opts.input.offset, opts.input.limit),
    ),
  setStatus: priveteProcedure
    .input(z.custom<RequestRescueUpdate>())
    .mutation(async opts => {
      opts.input.updatedAt = new Date();
      if (opts.input.id) {
        try {
          await db
            .updateTable('RequestRescue')
            .where('RequestRescue.id', '=', opts.input.id)
            .set(opts.input)
            .execute();
          return opts.input;
        } catch (error) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        }
      } else {
        throw new TRPCError({
          code: 'UNPROCESSABLE_CONTENT',
          message: 'no id',
        });
      }
    }),
  // delete: publicProcedure
  //   .input(z.custom<TodoUpdate>())
  //   .mutation(async (opts) => {
  //     if (opts.input.id)
  //       await db
  //         .deleteFrom("todo")
  //         .where("todo.id", "=", opts.input.id)
  //         .execute();
  //   }),
});

export type AppRouter = typeof appRouter;
