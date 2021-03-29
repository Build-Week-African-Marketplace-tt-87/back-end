exports.seed = async function (knex) {
  await knex("items").truncate();
  await knex("items").insert([
      { id: 1, item_name: "Eggs", quantity: 2, description:"fresh eggs", price: 2.99, location: "Uganda" }, 
      { id: 2, item_name: "Agwedde Beans", quantity: 5, description:"fresh beans", price: 4.99, location: "Uganda" }
  ])
}
