import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

export default function FeatureCard({
    title,
    description,
    content,
    icon,
    iconBgColor = "bg-primary-100",
    iconColor = "text-primary-500",
    exampleText
}) {
    return (
        <Card className="hover-shadow hover-lift transition-all duration-300">
            <CardHeader className="pb-0">
                <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center mb-4`}>
                    <span className={iconColor}>{icon}</span>
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                <p className="text-neutral-600 mb-4">
                    {content}
                </p>
                {exampleText && (
                    <div className="bg-neutral-50 p-3 rounded-md border border-neutral-200 kannada text-sm">
                        {exampleText}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}