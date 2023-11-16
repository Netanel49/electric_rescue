import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db
    
    .schema.createTable("UserRole")
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").unique().onDelete("cascade").notNull()
    )
    .addColumn("role", sql`"electric_rescue".role`)
    .execute();
}
export async function down(db: Kysely<any>): Promise<void> {
  await db
    
    .schema.dropTable("UserRole")
    .cascade()
    .ifExists()
    .execute();
}
