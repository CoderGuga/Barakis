import "bootstrap/dist/css/bootstrap.min.css"
import Signup from "./Signup"
/*import { useState } from "react"*/
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Login from "./Login"
import Text from "./text"
import Blog from "./blog"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/text" element={<Text/>}></Route>
        <Route path="/blog" element={<Blog/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
