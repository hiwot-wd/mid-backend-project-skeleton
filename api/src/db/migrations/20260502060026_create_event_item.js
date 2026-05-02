export function up(knex) {
  return knex.schema.createTable("event_item", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description");
    table.date("date");

    table.decimal("price", 10, 2).notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());

    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("app_user")
      .onDelete("SET NULL");
  });
}

export function down(knex) {
  return knex.schema.dropTable("event_item");
}
