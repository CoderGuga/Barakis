import "bootstrap/dist/css/bootstrap.min.css"
/*import { useState } from "react"*/
import { Routes, Route } from 'react-router-dom';
import Signup from "./Signup"
import Login from "./Login"
import Tasks from "./text"
import Items from "./items"

function App() {

  return (
  
      <Routes>
        <Route path="/register" element={<Signup/>}></Route>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/tasks" element={<Tasks/>}></Route>
        <Route path="/items" element={<Items/>}></Route>
      </Routes>
    
  )
}

export default App
