import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/design-system/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
    {
        variants: {
            variant: {
                primary: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm",
                secondary: "bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-sm",
                tertiary: "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm",
                outline: "border border-neutral-300 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-800",
                ghost: "hover:bg-neutral-100 active:bg-neutral-200 text-neutral-800",
                link: "underline-offset-4 hover:underline text-primary-500 p-0 h-auto",
                destructive: "bg-error-500 text-white hover:bg-error-600 active:bg-error-700 shadow-sm",
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-8 px-3 text-xs rounded-md",
                lg: "h-12 px-6 text-base rounded-md",
                icon: "h-10 w-10 p-2",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
    loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, isLoading = false, loadingText, children, ...props }, ref) => {
        const Comp = asChild ? React.Fragment : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <React.Fragment>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {loadingText || children}
                    </React.Fragment>
                ) : (
                    children
                )}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };