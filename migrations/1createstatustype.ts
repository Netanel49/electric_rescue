import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType("status")
    .asEnum(["pending", "recived", "on route", "done", "can`t be done"])
    .execute();
}
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropType("status").ifExists().execute();
}
