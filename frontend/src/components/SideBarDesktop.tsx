import React from 'react'
import { Button } from './ui/button'

const SideBarDesktop: React.FC = () => {
    const buttons: string[] = ['Party', 'All Entries & Bill', 'Stock', 'Item', 'Reports', 'Manage Staff', 'Settings', 'Paid Plan', 'Help & Support']

  return (
    <aside className='w-[180px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r bg-[#0F0E20]'>
        {buttons.map((button, index) => (
            <Button variant='sidebar' key={index}>{button}</Button>
        ))}
    </aside>
  )
}

export default SideBarDesktop
