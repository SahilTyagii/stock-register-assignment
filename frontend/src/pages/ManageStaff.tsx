import Navbar from '@/components/Navbar'
import StaffTable from '@/components/StaffTable'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
  } from "@/components/ui/dialog"
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import StaffForm from '@/components/StaffForm'

const ManageStaff: React.FC = () => {
    const [store, setStore] = useState<number>(0)
    const [addStaff, setAddStaff] = useState<boolean>(false)

    const handleAddStaffClick = () => {
        setAddStaff(true);
    }

  return (
    <div className='ml-[180px] bg-[#F8F8FF] h-screen font-light'>
        <Navbar onAddStaffClick={handleAddStaffClick} />
        <div className='p-4 space-x-2'>
            <Button variant={store === 0 ? 'storePressed' : 'storeSelect'} onClick={() => setStore(0)}>Store A</Button>
            <Button variant={store === 1 ? 'storePressed' : 'storeSelect'} onClick={() => setStore(1)}>Store B</Button>
        </div>
        <StaffTable />
        <Dialog open={addStaff} onOpenChange={setAddStaff}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Staff</DialogTitle>
                </DialogHeader>
                <StaffForm />
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default ManageStaff
