exports.seed = async function (knex) {
  await knex("categories").truncate();
  await knex("categories").insert([
      { id: 1, category_name: "Animal Products" }, 
      { id: 2, category_name: "Beans" }
    ])
}