exports.seed = async function (knex) {
  await knex("user_items").truncate();
  await knex("user_items").insert([
      { user_id: 1, item_id: 2 }, 
      { user_id: 2, item_id: 1 }
  ])
}