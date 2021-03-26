exports.up = async function(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name').notNull().unique()
    table.string('username').notNull().unique()
    table.string('password').notNull()
    table.boolean("owner").notNull()
  })

  await knex.schema.createTable('owners_items', (table) => {
    table.increments('id')
    table.integer('owners_id')
      .references('id')
      .inTable('users')
      .onDelete("CASCADE") 
      .onUpdate("CASCADE")  
    table.integer('item_id').notNull().unique()
    table.integer('quantity').notNull()
    table.text('description').notNull()
    table.float('price').notNull()
    table.string('location').notNull()
  })

  await knex.schema.createTable('items', (table) => {
    table.integer('id')
      .references('id')
      .inTable('owners_items')
      .onDelete("CASCADE") 
      .onUpdate("CASCADE")
    table.string("item_name").unique().notNull()
    table.integer("category_id")
  })

  await knex.schema.createTable('categories', (table) => {
    table.integer('id')
      .references('id')
      .inTable('items')
    table.string('category_name').notNull()
  })    
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('categories')
  await knex.schema.dropTableIfExists('items')
  await knex.schema.dropTableIfExists('owners_items')
  await knex.schema.dropTableIfExists('users')
};
