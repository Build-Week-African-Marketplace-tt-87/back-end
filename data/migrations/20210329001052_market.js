
exports.up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
      table.increments('id')
      table.string('name').notNull()
      table.string('username').notNull().unique()
      table.string('password').notNull()
      table.string("owner").notNull()
    })

    await knex.schema.createTable('items', (table) => {
      table.increments('id')
      table.string('item_name').notNull()
      table.integer('quantity').notNull()
      table.text('description').notNull().defaultTo('fill the description')
      table.float('price').notNull()
      table.string('location').notNull().defaultTo('N/A')
    })
    
    await knex.schema.createTable('user_items', (table) => {
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

      table.primary(["user_id", "item_id"])
    })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('items')
  await knex.schema.dropTableIfExists('user_items')
};
