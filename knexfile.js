// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/AfricanMarket.db3'
    },  
    migrations: { 
      directory: "./data/migrations" 
    },
    seeds: { 
      directory: "./data/seeds" 
    },
  },

  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      // connectionString: pgConnection,
      // ssl: { rejectUnauthorized: false },
      filename: './data/dev.db3'
    },
    migrations: { 
      directory: "./data/migrations" 
    },
    seeds: { 
      directory: "./data/seeds" 
    },
  },

  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/test.db3'
    },
    migrations: { 
      directory: "./data/migrations" 
    },
    seeds: { 
      directory: "./data/seeds" 
    },
  },

};
