const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://deevee4712:cCUmeCZHGAzwdnwr@react-todo-app.nmazpsi.mongodb.net/"
);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: { type: Boolean, default: false },
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};
