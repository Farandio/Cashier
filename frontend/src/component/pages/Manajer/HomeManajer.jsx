import React from 'react'
import NavbarManajer from '../../Navbar/NavbarManajer'
// import { labelColor } from './Chart'
// import Chart from './Chart'

const HomeManajer = () => {
  return (
    <div className='flex h-screen w-full bg-main-bg dark:bg-secondary-bg bg-cover object-cover'>
        <div className="w-full h-screen">
          <NavbarManajer />

          {/* <Chart /> */}
        </div>
    </div>
  )
}

export default HomeManajer