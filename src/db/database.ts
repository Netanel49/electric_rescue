import { Database } from './schema'; // this is the Database interface we defined earlier
import { Pool } from 'pg'; // this is the Pool interface we defined earlier
import { Kysely, PostgresDialect } from 'kysely';

export const pool = new Pool({
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: Number.isNaN(parseInt(process.env.POSTGRES_PORT as string))
    ? undefined
    : parseInt(process.env.POSTGRES_PORT as string),
  max: 10,
  ssl: process.env.NODE_ENV === 'production' ? true : false,
});
const dialect = new PostgresDialect({
  pool,
});

export const db = new Kysely<Database>({
  dialect,
}).withSchema('electric_rescue');
