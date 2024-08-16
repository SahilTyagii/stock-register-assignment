import React from 'react'
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

const formSchema = z.object({
    name: z.string().min(2, {message: "Name must be at least 2 characters.",}).max(25, {message: "Name must be at most 25 characters."}).regex(/^[a-zA-Z\s]*$/, {message: "Name must only contain letters."}),
    code: z.string().min(3, {message: "Code must be at least 3 characters."}).max(3, {message: "Code must be at most 3 characters."}).startsWith("+", {message: "Code must start with a '+'."}).regex(/^[0-9+]*$/, {message: "Code must only contain numbers."}),
    mobile: z.string().min(10, {message: "Mobile number must be at least 10 characters."}).max(10, {message: "Mobile number must be at most 10 characters."}).regex(/^[0-9]*$/, {message: "Mobile number must only contain numbers."}),
    store: z.literal("Store A").or(z.literal("Store B")),
    role: z.literal("Store Admin").or(z.literal("Sales Operator").or(z.literal("Sales Purchase Operator").or(z.literal("No Role")))),
})

const StaffForm: React.FC = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            code: "+91",
            mobile: "",
            store: "Store A",
            role: "Store Admin",
        }
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)
    }

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className='flex'>
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
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
                        <FormItem>
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
                        <FormItem>
                            <FormLabel>Mobile Number*</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter here" {...field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <div className='flex'>

                    <FormField
                    control={form.control}
                    name="store"
                    render={({ field }) => (
                        <FormItem>
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
                        <FormItem>
                            <FormLabel>Select</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <div className='flex w-full justify-end space-x-4'>
                    <Button variant='cancel' size='lg'>Cancel</Button>
                    <Button variant='save' size='lg' type="submit">Save</Button>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default StaffForm
