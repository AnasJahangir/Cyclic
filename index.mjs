import express from "express";
import cors from "cors";

import "dotenv/config";
const app = express();
app.use(express.json());
app.use(cors());

let todos = [{ id: 1, value: "haha" }];

app.post("/api/v1/todos", (req, res) => {
  todos.push({ value: req.body.value, id: Date.now() });
  res.status(200).send(todos);
});

app.get("/api/v1/todos", (req, res) => {
  res.status(200).send(todos);
});

app.put("/api/v1/todos/:id", (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  try {
    const index = todos.findIndex((item) => item.id === Number(id));

    if (index === -1) {
      return res.status(404).send("Todo not found");
    }

    todos[index].value = value;
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.delete("/api/v1/todos/:id", (req, res) => {
  const { id } = req.params;
  try {
    const index = todos.findIndex((item) => item.id === Number(id));

    if (index === -1) {
      return res.status(404).send("Todo not found");
    }
    todos.splice(index, 1);
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});


app.listen(process.env.PORT, () => {
  console.log("app is running port", process.env.PORT);
});
