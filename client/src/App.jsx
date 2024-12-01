import "bootstrap/dist/css/bootstrap.min.css"
import Signup from "./Signup"
/*import { useState } from "react"*/
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Login from "./Login"
import Tasks from "./text"
import Items from "./items"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup/>}></Route>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/tasks" element={<Tasks/>}></Route>
        <Route path="/items" element={<Items/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
