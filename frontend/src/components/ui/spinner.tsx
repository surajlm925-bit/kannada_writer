import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/design-system/utils";

const spinnerVariants = cva(
    "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
    {
        variants: {
            variant: {
                primary: "text-primary-500",
                secondary: "text-secondary-500",
                accent: "text-accent-500",
                neutral: "text-neutral-500",
            },
            size: {
                sm: "h-4 w-4 border-2",
                default: "h-6 w-6 border-2",
                lg: "h-8 w-8 border-3",
                xl: "h-12 w-12 border-4",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface SpinnerProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> { }

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(spinnerVariants({ variant, size, className }))}
                role="status"
                aria-label="Loading"
                {...props}
            >
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
);
Spinner.displayName = "Spinner";

export { Spinner };