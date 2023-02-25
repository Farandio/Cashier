import React from 'react'
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Login from './component/Login/Login';
import HomeAdmin from './component/pages/Admin/HomeAdmin'
import CrudMeja from './component/pages/Admin/CrudMeja';
import CrudMenu from './component/pages/Admin/CrudMenu';
import CrudUser from './component/pages/Admin/CrudUser';

import ListMenu from './component/pages/Kasir/ListMenu';

import HomeManajer from './component/pages/Manajer/HomeManajer';
// import { PrivateRoute } from './component/IsLogged/PrivateRoute';

function App() {
  return (
    <Routes>
        {/* <PrivateRoute exact path="/" component={Meja}/> */}
        <Route path="/" element={<Login/>} />
        <Route path="/admin/homeAdmin" element={<HomeAdmin/>} />
        <Route path="/admin/crudMenu" element={<CrudMenu/>} />
        <Route path="/admin/crudUser" element={<CrudUser/>} />
        <Route path="/admin/crudMeja" element={<CrudMeja/>} />

        <Route path="/kasir/listMenu" element={<ListMenu/>} />

        <Route path="/manajer/homeManajer" element={<HomeManajer/>} />
    </Routes>
  )
}


export default App
