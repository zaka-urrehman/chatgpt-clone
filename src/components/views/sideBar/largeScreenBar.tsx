import React from 'react'
import MenuItemsForSideBar from '../menuItemsForSideBar'

const LargeScreenBar = () => {
  return (
    <div className='h-screen bg-gray-800 max-md:hidden'>
        <MenuItemsForSideBar/>
    </div>
  )
}

export default LargeScreenBar