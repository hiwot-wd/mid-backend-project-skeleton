/**
 * Create "customer_order" table
 * Stores completed orders.
 */
export function up(knex) {
  return knex.schema.createTable("customer_order", (table) => {
    table.increments("id").primary();

    // FK → app_user.id
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("app_user")
      .onDelete("CASCADE");

    table.timestamp("created_at").defaultTo(knex.fn.now());

    // Order status: pending, paid, shipped, etc.
    table.string("status").notNullable().defaultTo("pending");

    // Total amount at checkout time
    table.decimal("total_amount", 10, 2).notNullable().defaultTo(0);
  });
}

export function down(knex) {
  return knex.schema.dropTable("customer_order");
}
