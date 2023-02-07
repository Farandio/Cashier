import React from 'react'
import './App.css';
import {Routes, Route} from 'react-router-dom'
// import Home from './component/Pages/Home';
// import User from './component/Pages/User';
import Meja from './component/pages/Meja';
import Login from './component/pages/Login/Login';
// import { PrivateRoute } from './component/IsLogged/PrivateRoute';

function App() {
  return (
    <Routes>
        {/* <PrivateRoute exact path="/" component={Meja}/> */}
        <Route path="/" element={<Login/>} />
        <Route path="/meja" element={<Meja/>} />
    </Routes>
  )
}


export default App
