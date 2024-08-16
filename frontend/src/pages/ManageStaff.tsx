import Navbar from '@/components/Navbar'
import StaffTable from '@/components/StaffTable'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import StaffForm from '@/components/StaffForm'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchAllStaff } from '@/features/StaffSlice'

const ManageStaff: React.FC = () => {
    const dispatch = useAppDispatch()
    const staff = useAppSelector((state) => state.staff.staff)
    const status = useAppSelector((state) => state.staff.status)
    const [store, setStore] = useState<number>(0)
    const [addStaff, setAddStaff] = useState<boolean>(false)


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllStaff())
        }
        console.log(staff)
    }, [status, dispatch])

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
            <StaffTable staff={staff} />
            <StaffForm addStaff={addStaff} setAddStaff={setAddStaff} />
        </div>
    )
}

export default ManageStaff
