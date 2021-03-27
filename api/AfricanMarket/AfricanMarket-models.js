const db = require("../../data/dbConfig")

module.exports = {
  findItems,
  findItemsById,
  findItemsByCategory,
  addItems,
  updateItemsById,
  deleteItems
}

function findItems(){
  // SELECT *
  // FROM items;
  return db("items")
}

function findItemsById(id){
  // SELECT *
  // FROM items
  // WHERE id = ?;
  return db("items")
    .where("id", id)
    .first();
}

function findItemsByCategory(category_id){
  // SELECT * 
  // FROM items
  // WHERE category_id = ?;
  return db("items")
    .where("category_id", category_id)
    .first();
}

async function addItems(item, id) {
  // INSERT INTO owners_items (owners_id, item_id, quantity, description, price, location)
  // VALUES (2, 3, 12, 'test', 4, 'Kenya');
  owners_item.owners_id = id
  return db("items").insert(item, "id");
}

async function updateItemsById(id, changes) {
  // UPDATE owners_items
  // SET item_id = 3, owners_id = 2, quantity = 13, description = 'more testing', price = 5, location = 'Uganda'
  // WHERE id = 3;
  return db("owners_items")
    .update(changes)
    .where({ id })
}

async function deleteItems(id) {
  // DELETE FROM owners_items
  // WHERE id = ?;
  return db("owners_items")
    .where({ id })
    .del()
}