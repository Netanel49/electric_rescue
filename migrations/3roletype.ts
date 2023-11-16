import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db
    
    .schema.createType("role")
    .asEnum(["admin", "superuser", "regular", "operator"])
    .execute();
}
export async function down(db: Kysely<any>): Promise<void> {

  await db
    
    .schema.dropType("role")
    .ifExists()
    .execute();
}
