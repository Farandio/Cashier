import React, { Component } from 'react'
import NavbarManajer from '../../Navbar/NavbarManajer'

export default class HomeAdmin extends Component {
  constructor() {
    super()
    this.state = {
      token: ""
  }
    let user = JSON.parse(localStorage.getItem('user'))
    if (localStorage.getItem("token") && user.role == "manajer") {
        this.state.token = localStorage.getItem("token")
    } else {
        window.location = "/"
    }
  }
  render() {
    return (
      <div className='flex h-screen w-full bg-main-bg dark:bg-secondary-bg bg-cover object-cover'>
        <div className="w-full h-screen">
          <NavbarManajer />

          {/* <Chart /> */}
        </div>
    </div>
    )
  }
}
