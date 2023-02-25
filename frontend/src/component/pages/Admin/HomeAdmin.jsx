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