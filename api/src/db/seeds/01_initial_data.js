import bcrypt from "bcrypt";

export async function seed(knex) {
  await knex("event_item").del();
  await knex("app_user").del();

  const passwordHash = await bcrypt.hash("password123", 10);

  const users = await knex("app_user")
    .insert([
      { email: "alice@example.com", password_hash: passwordHash },
      { email: "bob@example.com", password_hash: passwordHash },
    ])
    .returning("*");

  await knex("event_item").insert([
    {
      user_id: users[0].id,
      title: "Alice’s First Event",
      description: "A sample event created by Alice.",
    },
    {
      user_id: users[1].id,
      title: "Bob’s Launch Party",
      description: "Bob is hosting a launch event.",
    },
  ]);
}
