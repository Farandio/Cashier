import React from "react";
import { MdDashboard } from "react-icons/md";
import {MdOutlineRememberMe} from 'react-icons/md'
import {FaUserAlt} from 'react-icons/fa'
import {FaStore} from 'react-icons/fa'
import {VscServerEnvironment} from 'react-icons/vsc'

export const SidebarData = [
  {
    

  },
  
    {
    title: "Dashboard",
    path: "/home",
    icon: <MdDashboard />,
    className: "nav-text",
  },

  {
    title: "User",
    path: "/user",
    icon: <FaUserAlt />,
    className: "nav-text",
  },

  {
    title: "Member",
    path: "/member",
    icon: <MdOutlineRememberMe />,
    className: "nav-text",
  },

  {
    title: "Outlet",
    path: "/outlet",
    icon: <FaStore />,
    className: "nav-text",
  },

  {
    title: "Transaksi",
    path: "/transaksi",
    icon: <VscServerEnvironment />,
    className: "nav-text",
  },
];