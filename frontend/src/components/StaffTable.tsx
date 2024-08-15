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
  

const StaffTable: React.FC = () => {
  return (
    <div>
        <Table>
            <TableCaption>A list of all staff members.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead>Staff</TableHead>
                <TableHead className="w-[200px]">Mobile Number</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell>Sahil</TableCell>
                <TableCell>+919582053271</TableCell>
                <TableCell>Sales Operator</TableCell>
                <TableCell className="text-right">
                    <div>
                        <Button variant="outlineBlack">Remove Role</Button>
                        <Button variant="outlineRed">Delete Staff</Button>
                    </div>
                </TableCell>
                </TableRow>
            </TableBody>
        </Table>

    </div>
  )
}

export default StaffTable
