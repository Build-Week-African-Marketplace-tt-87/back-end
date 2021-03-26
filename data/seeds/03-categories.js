exports.seed = async function (knex) {
  await knex("categories").insert([
      { Id: 1, category_name: "Animal Products" }, 
      { Id: 2, category_name: "Beans" }
    ])
}