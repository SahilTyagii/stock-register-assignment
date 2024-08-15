import React from 'react'
import { Button } from './ui/button'

const Navbar: React.FC = () => {
  return (
    <div className='h-14 w-full shadow-sm flex justify-between bg-white'>
        <h1 className='text-xl font-semibold my-auto ml-4'>Manage Staff</h1>
        <Button variant='blue'>Add Staff</Button>
    </div>
  )
}

export default Navbar
