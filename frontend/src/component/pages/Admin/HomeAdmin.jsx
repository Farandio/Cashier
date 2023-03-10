import React, { Component } from 'react'
import NavbarAdmin from '../../Navbar/NavbarAdmin'

export default class HomeAdmin extends Component {
  constructor() {
    super()
    this.state = {
      token: ""
  }
    let user = JSON.parse(localStorage.getItem('user'))
    if (localStorage.getItem("token") && user.role == "admin") {
        this.state.token = localStorage.getItem("token")
    } else {
        window.location = "/"
    }
  }
  render() {
    return (
      <div className='flex h-screen w-full bg-main-bg dark:bg-home-bg bg-cover object-cover'>
        <div className="w-full h-screen">
                <NavbarAdmin />
        </div>
      </div>
    )
  }
}
