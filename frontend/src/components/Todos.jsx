import React from 'react'

// here todos = [
//     {title: "",
//     description: "",
//     completed:
// }`]
const Todos = ({todos}) => {
    return <div>

        {todos.map( (todo) => {
            return <div>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            {/* Since we are wokring wih rendering something here, we will have to use await  */}

            <button onClick={ async () => {
                try{
                    const response = await fetch("http://localhost:3000/completed",{
                        method: "PUT",
                        body:JSON.stringify({
                            id: todo._id
                        }),
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                    const { msg } = await response.json()
                    alert(msg);
                }
                catch (err) {
                    console.log(err)
                    alert("Failed to mark todo as completed!")
                    }
                }}> 
                {todo.completed == true ? "Completed" : "Mark as Complete"}
            </button>
            
            </div>
        })}
    

    </div> 
}

export default Todos
