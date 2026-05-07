/**
 *  "cart" table
 * Supports both guest and authenticated users.
 * Enforces one active cart per authenticated user.
 */
export function up(knex) {
  return knex.schema.createTable("cart", (table) => {
    table.increments("id").primary();

    // Authenticated user (nullable until login)
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("app_user")
      .onDelete("CASCADE")
      .nullable();

    // Guest cart token (UUID stored in cookie/localStorage)
    table.string("cart_token").unique().nullable();

    // Enforce: one active cart per authenticated user
    table.unique(["user_id"]);

    // Ensure the cart always belongs to someone
    table.check("user_id IS NOT NULL OR cart_token IS NOT NULL");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("cart");
}
