exports.seed = async function (knex) {
  await knex("items").insert([
      { Id: 1, category_id: 1, item_name: "Eggs" }, 
      { Id: 1, category_id: 2, item_name: "Agwedde Beans" }
  ])
}
