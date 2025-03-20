import CreateUser from "./Components/CreateUser";
import EditUser from "./Components/EditUser";
import ListUser from "./Components/ListUser";
import {BrowserRouter, Link, Routes, Route, Links} from 'react-router-dom'

export default function App(){
  return(
    <>
    <h1>React App Using PHP For CRUD Operation</h1>
   
    <nav>
      <ul>
        <li><Link to='/'>List Users</Link></li>
        <li><Link to='user/create'>Create User</Link></li>
      </ul>

    </nav>
   
    <Routes>
    <Route index element={<ListUser />} />
    <Route path="user/create" element={<CreateUser />} />
    <Route path="/user/:id/edit" element={<EditUser />} />
    </Routes>
    </>
  )
}