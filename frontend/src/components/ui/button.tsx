import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        sidebar: "w-full bg-inherit hover:bg-[#1602FF] text-[#AB8484] hover:text-white rounded-none text-xl justify-start my-2",
        blue: "bg-[#1602FF] my-auto text-white hover:bg-blue-900 w-32 h-10 rounded-sm mr-4",
        storeSelect: "bg-[#1602FF] text-white border border-[#1602FF] hover:bg-white hover:text-[#AB8484] hover:border-[#AB8484] hover:border font-normal rounded-full",
        storePressed: "bg-white text-[#AB8484] border-[#AB8484] border font-normal rounded-full",
        outlineBlack: "border border-black bg-background shadow-sm hover:bg-black hover:text-white w-32 rounded-sm mx-2",
        outlineRed: "border border-red-600 text-red-600 bg-background shadow-sm hover:bg-red-600 hover:text-white w-24 rounded-sm mx-2",
        save: "bg-[#1602FF] text-white rounded-sm border border-[#1602FF] hover:bg-blue-900 hover:border-blue-900 w-32",
        cancel: "bg-white text-[#1602FF] rounded-sm border border-[#1602FF] hover:bg-red-500 hover:border-red-500 hover:text-white w-32",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
