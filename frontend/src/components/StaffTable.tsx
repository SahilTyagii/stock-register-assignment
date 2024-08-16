import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from './ui/button'
import { Staff, updateRole } from '@/features/StaffSlice'
import { useAppDispatch } from '@/app/hooks'
interface StaffTableProps {
    staff: Staff[]
}


const StaffTable: React.FC<StaffTableProps> = ({ staff }) => {
    const dispatch = useAppDispatch()

    const removeRole = (id: string) => {
        dispatch(updateRole({_id: id, role: 'No Role'}))
        window.location.reload()
    }

  return (
    <div>
        <Table>
            <TableCaption>A list of all staff members.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className='w-[150px]'>Staff</TableHead>
                <TableHead className="w-[200px]">Mobile Number</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    staff.map((s, index) => (
                        <TableRow key={index}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.mobile}</TableCell>
                        <TableCell>{s.role}</TableCell>
                        <TableCell className="text-right">
                            <div>
                                {
                                    s.role === 'No Role' ? <Button variant="outlineBlack">Add Role</Button> : (
                                        <>
                                            <Button variant="outlineBlack">Change Role</Button>
                                            <Button variant="outlineBlack" onClick={() => {removeRole(s._id)}}>Remove Role</Button>
                                        </>
                                    )
                                }
                                <Button variant="outlineBlack">Rename Staff</Button>
                                <Button variant="outlineRed">Delete Staff</Button>
                            </div>
                        </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>

    </div>
  )
}

export default StaffTable
