
exports.seed = async function(knex) {
  await knex("owners_items").truncate();
  await knex("owners_items").insert([
    { id: 1, owners_id: 1, item_id: 1, quantity: 12, description: "Selling dozens of Eggs at Uganda", price: 5, location: "Uganda" },
    { id: 2, owners_id: 2, item_id: 2, quantity: 33, description: "Common Beans selling at Uganda come on by", price: 12, location: "Uganda" }
  ]);
}


