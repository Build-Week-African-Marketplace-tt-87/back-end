const db = require('../../data/dbConfig.js')

function find() {
  return db("users")
    .select("*")
}

function findById(id) {
  return db('users')
    .where({ id })
    .first()
}

function findBy(username) {
  return db('users')
    .where({ username })
    .first()
}

async function add(newUser) {
  const [id] = await db('users')
    .insert(newUser).returning("id") //returning for postgres, need for any adding
  return findById(id)
}

module.exports = {
  find,
  add,
  findBy,
  findById,
};