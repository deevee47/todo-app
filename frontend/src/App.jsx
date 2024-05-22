import { useEffect, useState } from "react";

import "./App.css";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);
  //This way of fetching is rendering infinte re-render which is bad SOLUTION: useEffect hook
  //Why does infinite re-render happen? Hint: useState

  //You won't see the JSON data directly in the expanded body property of console.log(res) because it represents a ReadableStream object. Instead, you need to use appropriate methods like .json() to parse the response body and access the JSON data.

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async function (res) {
        console.log(res);
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  return (
    <>
      <CreateTodo />
      <Todos todos={todos} />
    </>
  );
}

export default App;
