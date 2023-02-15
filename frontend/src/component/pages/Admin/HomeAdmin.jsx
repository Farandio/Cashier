// import React, { Component } from 'react';
// import axios from "axios";
// import NavbarAdmin from '../../Navbar/NavbarAdmin';

// export default class Meja extends React.Component {
//     constructor(){
//         super()
        
//         if (localStorage.getItem("token")) {
//             this.state.token = localStorage.getItem("token")
//         } else {
//             window.location = "/"
//         }
//     }
    
//     headerConfig = () => {
//         let header = {
//             headers: { Authorization: `Bearer ${this.state.token}` }
//         }
//         return header;
//     }

//   render() {
//     return (
//         <body className='dark:bg-main-bg bg-main-bg'>
//             <NavbarAdmin />
//             <h2>kontol</h2>
//         </body>
//     );  
//   }
// }

import React from 'react'
import NavbarAdmin from '../../Navbar/NavbarAdmin'

const HomeAdmin = () => {
  return (
    <div className='flex h-screen w-full bg-main-bg dark:bg-home-bg bg-cover object-cover'>
        <div className="w-full h-screen">
                <NavbarAdmin />
        </div>
    </div>
  )
}

export default HomeAdmin