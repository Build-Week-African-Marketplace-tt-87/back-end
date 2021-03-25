
exports.up = async function(knex) {
  await knex.schema.createTable('owners', (table)=> {
    table.increment('id')
    table.string('name').notNull().unique()
    table.string('username').notNull().unique()
    table.string('password').notNull()
  })  
}

exports.up = async function(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name').notNull().unique()
    table.string('username').notNull().unique()
    table.string('password').notNull()
  })
}

exports.up = async function(knex) {
  await knex.schema.createTable('items', (table) => {
    table.increments('item_id')
    table.string('item_name').notNull().unique()
    table.string('description').notNull()
    table.text('price').notNull()
    table.text('location').notNull()

    table.integer('owners_id')
      .notNull()
      .references('owners_id')
      .inTable('owners')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    table.integer('users_id')
      .notNull()
      .references('users_id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    table.primary(["owners_id", "users_id"])
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('owners')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('items')
};



