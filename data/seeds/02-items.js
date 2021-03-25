exports.seed = async function (knex) {
  await knex("items").insert(
    [
      { 
        item_id: 1, 
        item_name: "Eggs", 
        description: "Selling dozens of Eggs at Uganda", 
        price: "$5", 
        location: "Uganda", 
        owners_id: 1, 
        users_id: 1 
      }, 
      { 
        item_id: 2, 
        item_name: "Milk", 
        description: "Very cheap milk at only $4.00", 
        price: "$4", 
        location: "Ethiopia", 
        owners_id: 1, 
        users_id: 1 
      },
      { 
        item_id: 3, 
        item_name: "Agwedde Beans", 
        description: "Common Beans selling at Uganda come on by.", 
        price: "$12", 
        location: "Uganda", 
        owners_id: 1, 
        users_id: 1 
      },
    ]
  )
}