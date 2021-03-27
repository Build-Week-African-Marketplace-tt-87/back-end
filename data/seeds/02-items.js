exports.seed = async function (knex) {
  await knex("items").truncate();
  await knex("items").insert([
      { id: 1, item_name: "Eggs", category_id: 1 }, 
      { id: 2, item_name: "Agwedde Beans", category_id: 2 }
  ])
}
