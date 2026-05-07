/**
 * Create "cart_item" table
 * Items currently inside a user's cart.
 */
export function up(knex) {
  return knex.schema.createTable("cart_item", (table) => {
    table.increments("id").primary();

    // FK → cart.id
    table
      .integer("cart_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("cart")
      .onDelete("CASCADE");

    // FK → event_item.id
    table
      .integer("event_item_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("event_item")
      .onDelete("CASCADE");

    table.integer("quantity").notNullable().defaultTo(1);
  });
}

export function down(knex) {
  return knex.schema.dropTable("cart_item");
}
