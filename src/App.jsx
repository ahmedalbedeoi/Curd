import { useState } from 'react'
import './App.css'
import Todolist from './Componets/Todolist'
import { Todocontext } from './Context/contex'
import { v4 as uuidv4 } from 'uuid'
const todo=[
  {
    id:uuidv4(),
    title:"المهمه الاولى",
    des:"sasdsssss",
    isDone:false
  }
  ,
    {
    id:uuidv4(),
    title:"المهمه الاولى",
    des:"sasdsssss",
    isDone:false
  }
  ,  
  {
    id:uuidv4(),
    title:"المهمه الاولى",
    des:"sasdsssssff",
    isDone:false
  },
]


function App() {
  
  const [todoD,settodoD]=useState(todo)

  return (
    

   <>
   <Todocontext.Provider value={{todoD,settodoD}}>
   <Todolist />
   </Todocontext.Provider>

   </>
  )
}

export default App
