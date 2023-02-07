import {useState} from 'react';
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
import { SidebarData } from './Sidebar';
import './NavbarUs.css'


function NavbarUs() {

const [sidebar, setSidebar] = useState(false)

const showSidebar = () => setSidebar(!sidebar)


  return (
    <div>
      <div className="navbar-user">
        <Link to="#" className="menu-bars">
          <FaBars className="FaBars" onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu1 active" : "nav-menu1"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars1">
              <AiOutlineClose className="FaClose" />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.className}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );}

export default NavbarUs;
