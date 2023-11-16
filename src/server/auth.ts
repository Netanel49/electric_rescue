import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth';
import auth0Provider from 'next-auth/providers/auth0';
import z from 'zod';
import { db } from '@/db/database';
import { KyselyAdapter } from '@auth/kysely-adapter';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

export const authOptions: NextAuthOptions = {
  //@ts-ignore
  adapter: KyselyAdapter(db),
  secret: process.env.AUTH0_SECRET,
  providers: [
    auth0Provider({
      clientId: z.string().parse(process.env.AUTH0_CLIENT_ID),
      clientSecret: z.string().parse(process.env.AUTH0_CLIENT_SECRET),
      issuer: z.string().url().parse(process.env.AUTH0_ISSUER_BASE_URL),
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};
