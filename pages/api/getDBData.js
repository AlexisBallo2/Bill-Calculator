const knex = require("../../data/db"); // importing the db config

export default async function handler(req, res) {
  if (req.method === "POST") {
    const todos = await knex("data").where({groupName: "group1"}); // making a query to get all todos
    console.log("todos: ", todos);
    return res.status(200).json({ todos });
  }
}