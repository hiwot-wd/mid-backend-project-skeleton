/**
 * Create "order_item" table
 * Items purchased as part of an order.
 */
export function up(knex) {
  return knex.schema.createTable("order_item", (table) => {
    table.increments("id").primary();

    // FK → customer_order.id
    table
      .integer("order_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("customer_order")
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

    // Price at the time of purchase
    table.decimal("price_each", 10, 2).notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable("order_item");
}
