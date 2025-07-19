import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../lib/design-system/utils";

const toastVariants = cva(
    "relative w-full rounded-lg border p-4 shadow-md",
    {
        variants: {
            variant: {
                default: "bg-white border-neutral-200",
                destructive: "bg-error-50 border-error-200 text-error-700",
                success: "bg-success-50 border-success-200 text-success-700",
                warning: "bg-warning-50 border-warning-200 text-warning-700",
                info: "bg-info-50 border-info-200 text-info-700",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface ToastProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
    visible?: boolean;
    onClose?: () => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
    ({ className, variant, visible = true, onClose, children, ...props }, ref) => {
        if (!visible) return null;

        return (
            <div
                ref={ref}
                className={cn(toastVariants({ variant }), "relative", className)}
                role="alert"
                {...props}
            >
                {children}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 rounded-md p-1 text-neutral-400 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-300"
                        aria-label="Close"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        );
    }
);
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("font-medium", className)}
            {...props}
        />
    );
});
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("mt-1 text-sm", className)}
            {...props}
        />
    );
});
ToastDescription.displayName = "ToastDescription";

export { Toast, ToastTitle, ToastDescription };