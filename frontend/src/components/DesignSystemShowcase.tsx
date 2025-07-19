import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Input,
    Textarea,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    FormLabel,
    FormControl,
    FormGroup,
    Toast,
    ToastTitle,
    ToastDescription,
    Spinner
} from './ui';

export const DesignSystemShowcase: React.FC = () => {
    const [showToast, setShowToast] = React.useState(false);

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Kannada AI Content Generator</h1>
                <p className="text-lg text-muted-foreground mb-6">Design System Showcase</p>
            </div>

            {/* Color Palette */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Color Palette</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <div className="h-16 rounded-md bg-primary"></div>
                        <p className="text-sm font-medium">Primary</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-16 rounded-md bg-secondary"></div>
                        <p className="text-sm font-medium">Secondary</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-16 rounded-md bg-accent"></div>
                        <p className="text-sm font-medium">Accent</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-16 rounded-md bg-destructive"></div>
                        <p className="text-sm font-medium">Destructive</p>
                    </div>
                </div>
            </section>

            {/* Typography */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Typography</h2>
                <div className="space-y-4">
                    <div>
                        <h1 className="text-4xl font-bold">Heading 1</h1>
                        <h2 className="text-3xl font-bold">Heading 2</h2>
                        <h3 className="text-2xl font-bold">Heading 3</h3>
                        <h4 className="text-xl font-bold">Heading 4</h4>
                        <h5 className="text-lg font-bold">Heading 5</h5>
                        <h6 className="text-base font-bold">Heading 6</h6>
                    </div>
                    <div>
                        <p className="text-base">Regular paragraph text</p>
                        <p className="text-sm">Small text</p>
                        <p className="text-xs">Extra small text</p>
                    </div>
                    <div>
                        <p className="kannada text-lg">ಕನ್ನಡ ಪಠ್ಯ (Kannada Text)</p>
                        <p className="kannada">ಕನ್ನಡ ಎಐ ವಿಷಯ ಜನರೇಟರ್</p>
                    </div>
                </div>
            </section>

            {/* Buttons */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="tertiary">Tertiary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                        <span>+</span>
                    </Button>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Button disabled>Disabled</Button>
                    <Button isLoading>Loading</Button>
                    <Button isLoading loadingText="Processing...">Submit</Button>
                    <Button className="kannada">ಕನ್ನಡ ಬಟನ್</Button>
                </div>
            </section>

            {/* Form Components */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Form Components</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormGroup>
                        <FormControl>
                            <FormLabel htmlFor="default-input">Default Input</FormLabel>
                            <Input id="default-input" placeholder="Enter text..." />
                        </FormControl>

                        <FormControl error>
                            <FormLabel htmlFor="error-input">Input with Error</FormLabel>
                            <Input id="error-input" placeholder="Enter text..." error helperText="This field is required" />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="disabled-input">Disabled Input</FormLabel>
                            <Input id="disabled-input" placeholder="Disabled input" disabled />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="kannada-input" className="kannada">ಕನ್ನಡ ಇನ್‌ಪುಟ್</FormLabel>
                            <Input id="kannada-input" placeholder="ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..." className="kannada" />
                        </FormControl>
                    </FormGroup>

                    <FormGroup>
                        <FormControl>
                            <FormLabel htmlFor="default-textarea">Default Textarea</FormLabel>
                            <Textarea id="default-textarea" placeholder="Enter longer text..." />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="select">Select</FormLabel>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">Option 1</SelectItem>
                                    <SelectItem value="option2">Option 2</SelectItem>
                                    <SelectItem value="option3">Option 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>

                        <FormControl error>
                            <FormLabel htmlFor="error-select">Select with Error</FormLabel>
                            <Select error helperText="Please select an option">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="option1">Option 1</SelectItem>
                                    <SelectItem value="option2">Option 2</SelectItem>
                                    <SelectItem value="option3">Option 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                    </FormGroup>
                </div>
            </section>

            {/* Cards */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card description goes here</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>This is the main content of the card. It can contain any elements.</p>
                        </CardContent>
                        <CardFooter>
                            <Button>Action</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="kannada">ಕಾರ್ಡ್ ಶೀರ್ಷಿಕೆ</CardTitle>
                            <CardDescription className="kannada">ಕಾರ್ಡ್ ವಿವರಣೆ ಇಲ್ಲಿದೆ</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="kannada">ಇದು ಕಾರ್ಡ್‌ನ ಮುಖ್ಯ ವಿಷಯ. ಇದು ಯಾವುದೇ ಅಂಶಗಳನ್ನು ಒಳಗೊಂಡಿರಬಹುದು.</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="kannada">ಕ್ರಿಯೆ</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Feature Card</CardTitle>
                            <CardDescription>Top Band Generator</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Generate 6-line Kannada news headline blocks quickly and easily.</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Learn More</Button>
                            <Button>Try Now</Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            {/* Feedback Components */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Feedback Components</h2>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Toast Notifications</h3>
                        <div className="flex flex-wrap gap-4">
                            <Button onClick={() => setShowToast(true)}>Show Toast</Button>
                        </div>
                        {showToast && (
                            <div className="relative">
                                <Toast visible onClose={() => setShowToast(false)}>
                                    <ToastTitle>Success!</ToastTitle>
                                    <ToastDescription>Your content has been generated successfully.</ToastDescription>
                                </Toast>
                            </div>
                        )}
                        <div className="space-y-2 mt-4">
                            <Toast variant="destructive">
                                <ToastTitle>Error!</ToastTitle>
                                <ToastDescription>There was a problem with your request.</ToastDescription>
                            </Toast>
                            <Toast variant="success">
                                <ToastTitle>Success!</ToastTitle>
                                <ToastDescription>Operation completed successfully.</ToastDescription>
                            </Toast>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Loading Indicators</h3>
                        <div className="flex flex-wrap gap-8 items-center">
                            <div className="text-center">
                                <Spinner size="sm" />
                                <p className="text-xs mt-1">Small</p>
                            </div>
                            <div className="text-center">
                                <Spinner />
                                <p className="text-xs mt-1">Medium</p>
                            </div>
                            <div className="text-center">
                                <Spinner size="lg" />
                                <p className="text-xs mt-1">Large</p>
                            </div>
                            <div className="text-center">
                                <Spinner variant="secondary" />
                                <p className="text-xs mt-1">Secondary</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DesignSystemShowcase;