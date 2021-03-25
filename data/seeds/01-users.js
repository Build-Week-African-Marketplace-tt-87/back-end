
exports.seed = async function(knex) {
    await knex("users").truncate();
    await knex("users").insert([
        { id: 1, name: "danielle", username: "danielle1", password: "1234" },
        { id: 2, name: "jim", username: "jim1", password: "4321" },
        { id: 3, name: "jake", username: "jake1", password: "12345" },
        { id: 4, name: "jonathan", username: "jonathan1", password: "54321" }
    ]);
  };