
exports.seed = async function(knex) {
  await knex("owners").truncate();
  await knex("owners").truncate();
  await knex("owners").insert([
    { id: 1, username: "owner", password: "1234", }
  ]);
}
