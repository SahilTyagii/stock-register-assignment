import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(25, { message: "Name must be at most 25 characters." }).regex(/^[a-zA-Z\s]*$/, { message: "Name must only contain letters." }),
    code: z.string().min(3, { message: "Code must be at least 3 characters." }).max(3, { message: "Code must be at most 3 characters." }).startsWith("+", { message: "Code must start with a '+'." }).regex(/^[0-9+]*$/, { message: "Code must only contain numbers." }),
    mobile: z.string().min(10, { message: "Mobile number must be at least 10 characters." }).max(10, { message: "Mobile number must be at most 10 characters." }).regex(/^[0-9]*$/, { message: "Mobile number must only contain numbers." }),
    store: z.literal("Store A").or(z.literal("Store B")),
    role: z.literal("Store Admin").or(z.literal("Sales Operator").or(z.literal("Sales Purchase Operator").or(z.literal("No Role")))),
})

interface StaffFormProps {
    addStaff: boolean;
    setAddStaff: React.Dispatch<React.SetStateAction<boolean>>;
}

const StaffForm: React.FC<StaffFormProps> = ({ addStaff, setAddStaff }) => {
    const [currentRole, setCurrentRole] = useState<string>("No Role");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            code: "+91",
            mobile: "",
            store: "Store A",
            role: "No Role",
        }
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        data.mobile = data.code + data.mobile;
        console.log(data);
        setAddStaff(false);
    }

    const closeForm = () => {
        setAddStaff(false);
    }

    interface Perms {
        role: string;
        permissions: string[];
    }

    const permissions: Perms[] = [
        { role: "Store Admin", permissions: ["View all entries & download reports", "Add, edit, delete any type of entry", "View total sale, purchase", "View all added items, add new item, edit item, delete item", "Add new party, view all added parties and their entries", "Download & share all reports, bills"] },
        { role: "Sales Operator", permissions: ["View opening stock, remaining stock of all items", "Add sale entry, stock out entry", "Add new party", "View added sale bill and share to party"] },
        { role: "Sales Purchase Operator", permissions: ["View opening stock, remaining stock of all items", "Add sale entry, stock out entry", "Add new party", "View added sale bill and share to party"] },
    ];

    // Get permissions for the current role
    const currentPermissions = permissions.find(p => p.role === currentRole)?.permissions || [];

    return (
        <div>
            <Dialog open={addStaff} onOpenChange={setAddStaff}>
                <DialogContent className="sm:w-full bg-inherit">
                    <DialogHeader>
                        <DialogTitle>Add Staff</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className='flex space-x-2 mt-4'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className='w-6/12'>
                                            <FormLabel>Staff Name*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Here" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem className='w-1/12'>
                                            <FormLabel>Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mobile"
                                    render={({ field }) => (
                                        <FormItem className='w-5/12'>
                                            <FormLabel>Mobile Number*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter here" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex space-x-2'>
                                <FormField
                                    control={form.control}
                                    name="store"
                                    render={({ field }) => (
                                        <FormItem className='w-6/12'>
                                            <FormLabel>Select Store</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Select'>{field.value}</SelectValue>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Store A">Store A</SelectItem>
                                                    <SelectItem value="Store B">Store B</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem className='w-6/12'>
                                            <FormLabel>Select Role</FormLabel>
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setCurrentRole(value);
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Select'>{field.value}</SelectValue>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Store Admin">Store Admin</SelectItem>
                                                    <SelectItem value="Sales Operator">Sales Operator</SelectItem>
                                                    <SelectItem value="Sales Purchase Operator">Sales Purchase Operator</SelectItem>
                                                    <SelectItem value="No Role">No Role</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='bg-white w-full m-2 z-50 text-[#504646]' style={{ minHeight: '170px' }}>
                                <h1 className='font-semibold'>
                                    {currentRole} Permissions -
                                </h1>
                                <ul style={{ listStyleType: 'disc' }} className='ml-8'>
                                    {
                                        currentRole === "No Role" ? (
                                            <li>No permissions available for the selected role.</li>
                                        ) : (
                                            currentPermissions.map((perm, index) => (
                                                <li key={index}>{perm}</li>
                                            ))
                                        )
                                    }
                                </ul>
                            </div>
                            <DialogFooter className=' space-x-4'>
                                <Button variant='cancel' size='lg' onClick={closeForm} type='button'>Cancel</Button>
                                <Button variant='save' size='lg' type="submit">Save</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default StaffForm
