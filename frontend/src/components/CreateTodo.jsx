import React from 'react'
import { useState } from "react";

const CreateTodo = () => {

  //We could have used document.something to get input data but the point of react is to eliminate document wala way 
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")

  return (
    <div>
      {/* //onChange will trigger alot of re render this is not a good practice */}
      <input style={{padding: 10,margin:10}} type='text'
       onChange= {(e)=> {const value = e.target.value; setTitle(value)}} placeholder='Title'></input>
      <input style={{padding: 10,margin:10}} type='text'
       onChange= {(e)=> {const value = e.target.value; setDescription(value)}} placeholder='Description'></input>

      <button 
      style={{padding: 10,margin:10}}
      onClick={async () => {
        // can also use axios
        // This fetch will trigger alot of re render this is not a good practice
        try{
        const response = await fetch("http://localhost:3000/todo", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            description: description
          }),
          headers: {
            //This tells your backend that the data is json and work according to it!!
            "Content-type": "application/json"
          }
        }) 
          const { msg } = await response.json()
          alert(msg)
      }
        catch (err) {
          console.log(err)
        }
      }}> Add a todo</button>
    </div>
  )
}

export default CreateTodo
