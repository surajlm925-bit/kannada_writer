import React from "react";
import { cn } from "../../lib/design-system/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-gray-200 dark:bg-gray-700", className)}
            {...props}
        />
    );
}

export function TextSkeleton({ lines = 3, className = "" }) {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={`h-4 ${i === lines - 1 && lines > 1 ? "w-4/5" : "w-full"}`}
                />
            ))}
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="border rounded-lg p-4 space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <TextSkeleton lines={4} />
            <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-4 w-24" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                </div>
            </div>
        </div>
    );
}

export function ResultSkeleton() {
    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="border-b p-4 bg-gray-50">
                <Skeleton className="h-6 w-1/3" />
            </div>
            <div className="p-6">
                <TextSkeleton lines={8} />
            </div>
            <div className="border-t p-4 bg-gray-50 flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                </div>
            </div>
        </div>
    );
}