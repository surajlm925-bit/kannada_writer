import * as React from "react";
import { cn } from "../../lib/design-system/utils";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
    helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, helperText, ...props }, ref) => {
        return (
            <div className="w-full">
                <textarea
                    className={cn(
                        "flex min-h-[80px] w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400",
                        "focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300",
                        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50",
                        error
                            ? "border-error-500 focus:border-error-500 focus:ring-error-300"
                            : "",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
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

Textarea.displayName = "Textarea";

export { Textarea };