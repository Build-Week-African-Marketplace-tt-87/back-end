exports.seed = async function(knex) {
    await knex("users").truncate();
    await knex("users").insert([
        { id: 1, username: "danielle1", password: "1234", owner: 'true' },
        { id: 2, username: "jim1", password: "4321", owner: 'true' },
        { id: 3, username: "jake1", password: "12345", owner: 'true' },
        { id: 4, username: "jonathan1", password: "54321", owner: 'true' },
        { id: 5, username: "123", password: "123", owner: 'false' }
    ]);
  };