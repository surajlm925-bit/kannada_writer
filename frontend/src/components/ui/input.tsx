import * as React from "react";
import { cn } from "../../lib/design-system/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    helperText?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, helperText, startIcon, endIcon, ...props }, ref) => {
        return (
            <div className="relative w-full">
                {startIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                        {startIcon}
                    </div>
                )}
                <input
                    className={cn(
                        "flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400",
                        "focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300",
                        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50",
                        error
                            ? "border-error-500 focus:border-error-500 focus:ring-error-300"
                            : "",
                        startIcon ? "pl-10" : "",
                        endIcon ? "pr-10" : "",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {endIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
                        {endIcon}
                    </div>
                )}
                {helperText && (
                    <p
                        className={cn(
                            "mt-1 text-sm",
                            error ? "text-error-500" : "text-neutral-500"
                        )}
                    >
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };