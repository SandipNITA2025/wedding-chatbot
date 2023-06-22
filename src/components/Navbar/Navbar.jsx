import React from 'react'
import {FiMenu} from 'react-icons/fi'

import Logo  from '../../icons/logo.png'

const Navbar = () => {
  return (
    <div className='z-20 absolute sm:flex sm:w-full sm:bg-[#a4634426] top-0 z-10 w-full p-6 px-10 sm:p-[8px] flex items-center justify-between' >
        <div className=' flex items-center  gap-3'>
            <img className=' w-[42px] h-[42px] sm:w-[25px] sm:h-[25px]' src={Logo} alt="" />
            <p className=' text-2xl sm:text-xl font-bold' > <span className='text-[#F53C75]' >We</span><span>Bot</span> </p>
        </div>
        <div>
          <FiMenu size={20} className="text-white hidden sm:block" />
        </div>
    </div>
  )
}

export default Navbar