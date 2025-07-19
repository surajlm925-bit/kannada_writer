import * as React from "react";
import { cn } from "../../lib/design-system/utils";

// Form Label
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
    ({ className, children, required, ...props }, ref) => {
        return (
            <label
                ref={ref}
                className={cn("text-sm font-medium text-neutral-900", className)}
                {...props}
            >
                {children}
                {required && <span className="ml-1 text-error-500">*</span>}
            </label>
        );
    }
);

FormLabel.displayName = "FormLabel";

// Form Helper Text
interface FormHelperTextProps
    extends React.HTMLAttributes<HTMLParagraphElement> {
    error?: boolean;
}

const FormHelperText = React.forwardRef<HTMLParagraphElement, FormHelperTextProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <p
                ref={ref}
                className={cn(
                    "mt-1 text-sm",
                    error ? "text-error-500" : "text-neutral-500",
                    className
                )}
                {...props}
            />
        );
    }
);

FormHelperText.displayName = "FormHelperText";

// Form Control
interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
    error?: boolean;
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("space-y-1", className)}
                data-testid="form-control"
                {...props}
            />
        );
    }
);

FormControl.displayName = "FormControl";

// Form Group
const FormGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("space-y-4", className)}
            data-testid="form-group"
            {...props}
        />
    );
});

FormGroup.displayName = "FormGroup";

export { FormLabel, FormHelperText, FormControl, FormGroup };