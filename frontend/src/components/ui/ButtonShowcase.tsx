import React, { useState } from 'react';
import { Button } from './button';

export const ButtonShowcase: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadingClick = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="p-6 space-y-8">
            <div>
                <h2 className="text-lg font-semibold mb-4">Button Variants</h2>
                <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="tertiary">Tertiary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4">Button Sizes</h2>
                <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                    </Button>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4">Button States</h2>
                <div className="flex flex-wrap gap-4">
                    <Button onClick={handleLoadingClick} isLoading={isLoading}>
                        {isLoading ? 'Loading...' : 'Click to Load'}
                    </Button>
                    <Button isLoading loadingText="Submitting...">Submit</Button>
                    <Button disabled>Disabled</Button>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4">Combined Examples</h2>
                <div className="flex flex-wrap gap-4">
                    <Button variant="primary" size="lg">
                        Primary Large
                    </Button>
                    <Button variant="secondary" size="sm">
                        Secondary Small
                    </Button>
                    <Button variant="outline" isLoading={isLoading} onClick={handleLoadingClick}>
                        {isLoading ? 'Processing...' : 'Outline with Loading'}
                    </Button>
                </div>
            </div>
        </div>
    );
};