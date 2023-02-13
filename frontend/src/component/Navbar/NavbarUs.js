import React from "react"
import { Link } from "react-router-dom"


export default class Navbar extends React.Component {
  constructor() {
      super();
      this.state = {
        role: ""
      };
    }

  Logout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location = "/"
  }

  HomeRedirect = () => {
    let user = window.localStorage.getItem("user");
    this.state.role = user.role;
    switch (this.state.role) {
              case "admin":
                window.location = "/homeAdmin";
                // href="/Register"
                break;
              case "manajer":
                window.location = "/homeManajer";
                break;
              case "kasir":
                window.location = "/menuKasir";
                break;
              default: console.log(this.state.role);
                break;
    }
  }
  render() {
      return (
          <div>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-white">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <span className="self-center text-xl font-extrabold whitespace-nowrap dark:text-a">
                  FA CASHIER
                </span>
              <div
                className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="mobile-menu-language-select"
              >
                <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-white md:dark:bg-white dark:border-gray-700">
                  <li>
                    <a
                      onClick={() => this.HomeRedirect()}
                      className="block text-a focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-1 dark:bg-white dark:hover:bg-b dark:hover:text-white "
                      aria-current="page"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/crudMenu"
                      className="block text-a focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-1 dark:bg-white dark:hover:bg-b dark:hover:text-white "
                    >
                      Menu
                    </a>
                  </li>
                  <li>
                    <a
                      href="/crudUser"
                      className="block text-a focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-1 dark:bg-white dark:hover:bg-b dark:hover:text-white "
                    >
                      User
                    </a>
                  </li>
                  <li>
                    <a
                      href="/meja"
                      className="block text-a focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-1 dark:bg-white dark:hover:bg-b dark:hover:text-white"
                    >
                      Meja
                    </a>
                  </li>
                  <li>
                    <button
                    onClick={() => this.Logout()}
                      className="block text-red focus:ring-4 focus:outline-none font-semibold rounded-lg px-5 py-1 dark:bg-white dark:hover:bg-red dark:hover:text-white outline outline-2 dark:outline-red"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          </div>
      )
  }
}
