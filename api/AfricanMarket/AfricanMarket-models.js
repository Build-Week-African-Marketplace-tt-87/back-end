const db = require("../../data/dbConfig")

module.exports = {
  findItems,
  findItemsById,
  addItems,
  updateItemsById,
  deleteItems
}

function findItems() {
  // SELECT *
  // FROM items;
  return db("items")
}

function findItemsById(id) {
  // SELECT *
  // FROM items
  // WHERE id = ?;
  return db("items")
    .where({ id })
    .first();
}

async function addItems(item) {
  // INSERT INTO items (item_name, quantity, description, price, location)
  // VALUES ('TEST', 3, 'testing a description', 5.44, 'Kenya');
  const [id] = await db("items")
    .insert(item)
    .returning("id")
  return findItemsById(id)
}

function updateItemsById(id, changes) {
  // UPDATE items
  // SET item_name = 'UPDATED TEST', quantity = 22, description = 'UPDATED testing a description', price = 5.45, location = 'Uganda'
  // WHERE id = ?;
  return db("items")
    .where("id", id)
    .update(changes)
}

function deleteItems(id) {
  // DELETE FROM items 
  // WHERE id = 3;
  return db("items")
    .where({ id })
    .del()
}