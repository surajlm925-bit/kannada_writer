import * as React from "react";
import { cn } from "../../lib/design-system/utils";
import { ChevronDown } from "lucide-react";

// Select Container
interface SelectContextValue {
    value: string;
    onValueChange: (value: string) => void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    disabled?: boolean;
    error?: boolean;
}

const SelectContext = React.createContext<SelectContextValue | undefined>(
    undefined
);

interface SelectProps {
    children: React.ReactNode;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
}

const Select = ({
    children,
    defaultValue,
    value,
    onValueChange,
    disabled,
    error,
    helperText,
}: SelectProps) => {
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");

    const handleValueChange = React.useCallback(
        (newValue: string) => {
            if (value === undefined) {
                setInternalValue(newValue);
            }
            onValueChange?.(newValue);
            setOpen(false);
        },
        [onValueChange, value]
    );

    const contextValue = React.useMemo(
        () => ({
            value: value !== undefined ? value : internalValue,
            onValueChange: handleValueChange,
            open,
            setOpen,
            disabled,
            error,
        }),
        [value, internalValue, handleValueChange, open, disabled, error]
    );

    return (
        <SelectContext.Provider value={contextValue}>
            <div className="relative w-full">
                {children}
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
        </SelectContext.Provider>
    );
};

// Select Trigger
interface SelectTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    error?: boolean;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
    ({ className, children, error, ...props }, ref) => {
        const context = React.useContext(SelectContext);
        if (!context) {
            throw new Error("SelectTrigger must be used within a Select");
        }

        const { open, setOpen, disabled, error: contextError } = context;
        const isError = error || contextError;

        return (
            <button
                type="button"
                className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900",
                    "focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300",
                    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50",
                    isError
                        ? "border-error-500 focus:border-error-500 focus:ring-error-300"
                        : "",
                    className
                )}
                onClick={() => setOpen(!open)}
                disabled={disabled}
                ref={ref}
                {...props}
            >
                {children}
                <ChevronDown
                    className={cn(
                        "h-4 w-4 text-neutral-500 transition-transform",
                        open ? "rotate-180" : ""
                    )}
                />
            </button>
        );
    }
);

SelectTrigger.displayName = "SelectTrigger";

// Select Value
interface SelectValueProps {
    placeholder?: string;
}

const SelectValue = ({ placeholder }: SelectValueProps) => {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("SelectValue must be used within a Select");
    }

    const { value } = context;
    const selectedItem = React.Children.toArray(
        context.value
    ).find((child) => React.isValidElement(child) && child.props.value === value);

    return (
        <span className="truncate">
            {value ? (
                React.isValidElement(selectedItem) ? (
                    selectedItem.props.children
                ) : (
                    value
                )
            ) : (
                <span className="text-neutral-400">{placeholder}</span>
            )}
        </span>
    );
};

// Select Content
interface SelectContentProps {
    children: React.ReactNode;
    className?: string;
}

const SelectContent = ({ children, className }: SelectContentProps) => {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("SelectContent must be used within a Select");
    }

    const { open } = context;

    if (!open) return null;

    return (
        <div
            className={cn(
                "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-neutral-200 bg-white py-1 shadow-lg",
                className
            )}
        >
            {children}
        </div>
    );
};

// Select Item
interface SelectItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    value: string;
}

const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
    ({ className, children, value, ...props }, ref) => {
        const context = React.useContext(SelectContext);
        if (!context) {
            throw new Error("SelectItem must be used within a Select");
        }

        const { value: selectedValue, onValueChange } = context;
        const isSelected = selectedValue === value;

        return (
            <li
                ref={ref}
                className={cn(
                    "relative flex cursor-pointer select-none items-center px-3 py-2 text-sm",
                    "hover:bg-neutral-100",
                    isSelected ? "bg-primary-50 text-primary-700" : "text-neutral-900",
                    className
                )}
                onClick={() => onValueChange(value)}
                {...props}
            >
                {children}
            </li>
        );
    }
);

SelectItem.displayName = "SelectItem";

export {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
};