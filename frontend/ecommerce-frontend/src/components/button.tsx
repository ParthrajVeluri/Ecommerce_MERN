import { ButtonHTMLAttributes, FC } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/utils";

const buttonVariants = cva("inline-flex items-center justify-center rounded-md text-sm border", {
    variants: {
        variant: {
            default: "bg-nexus text-white hover:bg-nexus-shade-600",
        },
        size: {
            default: "h-10 mx-2 py-2 px-4 my-2",
            sm: "h-9 px-2 rounded-md",
            lg: "h-11 px-8 rounded-md",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = ({ className, size, variant, ...props }) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
};

export default Button;
