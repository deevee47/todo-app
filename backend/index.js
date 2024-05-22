//Write basic express boilerplate code
//with express.json() middleware

const express = require("express");
const app = express();
const port = 3000;
const { todo } = require("./db");
const { createTodoSchema, updateTodoSchema } = require("./types");
const cors = require("cors");

//helps to access localchost silently (basically levels down the security of your localhost)
app.use(cors());

//Helps to handle post requests
//parses the incoming JSON request body and makes it available as req.body.
app.use(express.json());

app.get("/todos", async (req, res) => {
  const todos = await todo.find(); //Gives all the data from the DB
  res.json({ todos });
});

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  console.log("hi", createPayload);
    const parsedPayload = createTodoSchema.safeParse(createPayload);
      console.log("hi", parsedPayload);
  if (!parsedPayload.success) {
    res.status(411).json({ msg: "You sent the wrong inputs" });
    return;
  }

  //put it in DB
  await todo.create({
    title: parsedPayload.data.title,
    description: parsedPayload.data.description,
    completed: false,
  });

  res.status(200).json({ msg: "Todo added to the database" });
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodoSchema.safeParse(updatePayload);
  console.log(parsedPayload);
  if (!parsedPayload.success) {
    res.status(411).json({ msg: "Wrong Inputs!" });
    return;
  }

  try {
    await todo.updateOne(
      {
        _id: req.body.id,
      },
      {
        completed: true,
      }
    );

    res.json({
      msg: "Todo marked as completed",
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(404).json({ msg: "Todo not found!" });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
