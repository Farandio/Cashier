import React from "react"
import { Link } from "react-router-dom"
import md5 from "md5"
import Logo from "../assets/logo/logo.png"

export default class NavbarAdmin extends React.Component {
  Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location = "/"
  }
  render() {
    return (
      <div>
      <div className="dark:bg-text-color">
        <nav className="px-2 sm:px-4 py-2.5 dark:bg-text-color fixed w-full z-20 top-0 left-0 shadow-md shadow-black">
          {/* <div className="container flex flex-wrap items-center justify-between mx-auto">
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="mobile-menu-language-select"
            > */}
              <ul className=" flex  p-4 mt-4 border justify-between border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:border-gray-700">
                <div className="inline-flex">
                  <li className="">
                    <a
                      href="/kasir/listMenu"
                      className="block text-white focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-1 dark:hover:bg-primary-600 dark:hover:text-white"
                      aria-current="page"
                    >
                      Menu
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="/kasir/onGoing"
                      className="block text-white focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-1 dark:hover:bg-primary-600 dark:hover:text-white"
                    >
                      On Going
                    </a>
                  </li>
                </div>
                <div className="justify-center">
                  <img src={Logo} alt="logo" style={{width: 60}}/>
                </div>
                <div className="inline-flex">
                  <li className="">
                    <a
                      href="/manajer/profileManajer"
                      className="block text-white focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-1 dark:hover:bg-primary-600 dark:hover:text-white"
                    >
                      Profile
                    </a>
                  </li>
                  <li className="">
                    <button
                      onClick={() => this.Logout()}
                      className="block text-red focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-1 dark:hover:bg-red dark:hover:text-white"
                    >
                      Logout
                    </button>
                  </li>
                </div>
              </ul>
            {/* </div>
          </div> */}
        </nav>
      </div>
      </div>
    )
  }
}
