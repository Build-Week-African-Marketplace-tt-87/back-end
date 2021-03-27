exports.up = async function(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name').notNull()
    table.string('username').notNull().unique()
    table.string('password').notNull()
    table.boolean("owner").notNull()
  })
  
  await knex.schema.createTable('items', (table) => {
    table.increments('id')
    table.string("item_name").unique().notNull()
    table.integer("category_id")
      .notNull()
      .references('id')     
      .inTable('categories')
  })

  await knex.schema.createTable('owners_items', (table) => {
    table.increments('id')
    table.integer('user_id')
      .notNull()
      .references('id')
      .inTable('users')
      .onDelete("CASCADE") 
      .onUpdate("CASCADE")
    table.integer('item_id')
      .notNull()
      .references('id')
      .inTable('items')  
      .onDelete("CASCADE") 
      .onUpdate("CASCADE")
    table.integer('quantity').notNull()
    table.text('description').notNull().defaultTo('fill the description')
    table.float('price').notNull()
    table.string('location').notNull().defaultTo('N/A')
  })

  await knex.schema.createTable('categories', (table) => {
    table.increments('id')
    table.integer('category_name')
      .notNull()
      .unique()
  })
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('categories')
  await knex.schema.dropTableIfExists('owners_items')
  await knex.schema.dropTableIfExists('items')
  await knex.schema.dropTableIfExists('users')
};
