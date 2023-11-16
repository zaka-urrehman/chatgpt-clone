'use client'
import { useState } from 'react'
import { AiOutlineCloseSquare, AiOutlineMenu } from 'react-icons/ai'
import MenuItemsForSideBar from '../menuItemsForSideBar'

const SmallScreenBar = () => {
    // controls the open and close of sidebar on small screens
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }

    return (
        // small screen sidebar
        <div className='md:hidden absolute'>

            {/* hamburger icon  */}
            <div onClick={handleClick} >
                {open ? "" : <div className='p-2'> <AiOutlineMenu size={34} /> </div>}
            </div>

            {
                open ?
                    <div className='bg-gray-800 h-screen w-72 duration-300 relative'>

                        {/* close icon */}
                        <div className='absolute top-3 -right-12  ' onClick={handleClick}> <AiOutlineCloseSquare size={44} /> </div>

                        <MenuItemsForSideBar/>
                    </div>
                    : <div></div>
            }

        </div>
    )
}

export default SmallScreenBar