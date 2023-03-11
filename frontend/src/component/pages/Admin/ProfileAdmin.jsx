import React, { Component } from 'react'
import $ from "jquery";
import axios from 'axios';
import NavbarAdmin from '../../Navbar/NavbarAdmin';

export default class ProfileAdmin extends Component {
    constructor(){
        super()
        this.state = {
            token: "",
            nama_user: "",
            role: "",
            username: ""

        }
        let user = JSON.parse(localStorage.getItem('user'))
        if (localStorage.getItem("token") && user.role == "admin") {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header;
    }

    getUser = () => {
        let url = "http://localhost:4000/cashier/api/user/" + this.state.id_user
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ users: response.data.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        window.location = '/'
                    }
                } else {
                    console.log(error);
                }
            })
    }

    componentDidMount() {
      const userData = JSON.parse(localStorage.getItem('user'));
  
      if (userData) {
        this.setState({
          nama_user: userData.nama_user,
          role: userData.role,
          username: userData.username
        });
      }
    }
  render() {
    return (
      <div className='h-screen w-full dark:bg-secondary-bg bg-cover object-cover'>
        <NavbarAdmin />
        <div className='flex justify-center items-center pt-48'>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-3xl shadow dark:bg-text-color">
        <div className="flex flex-col items-center py-56">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt="Admin Profile"
            />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {this.state.nama_user}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {this.state.role}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {this.state.username}
          </span>
          {/* <div className="flex mt-4 space-x-3 md:mt-6">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {this.state.updatedAt}
            </a>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Message
            </a>
          </div> */}
        </div>
          </div>
          </div>
          </div>
    )
  }
}
