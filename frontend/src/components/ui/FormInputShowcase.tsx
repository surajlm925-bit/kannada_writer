import React, { useState } from 'react';
import { Input } from './input';
import { Textarea } from './textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select';
import { FormLabel, FormControl, FormGroup } from './form';
import { Search, Eye, EyeOff, Check, X } from 'lucide-react';

export const FormInputShowcase: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        message: '',
        category: '',
        kannada: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));

        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormValues((prev) => ({ ...prev, [name]: value }));

        // Clear error when user selects
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        const newErrors: Record<string, string> = {};

        if (!formValues.name) {
            newErrors.name = 'Name is required';
        }

        if (!formValues.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formValues.password) {
            newErrors.password = 'Password is required';
        } else if (formValues.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formValues.category) {
            newErrors.category = 'Please select a category';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert('Form submitted successfully!');
        }
    };

    return (
        <div className="p-6 space-y-8">
            <div>
                <h2 className="text-lg font-semibold mb-4">Form Input Components</h2>

                <form onSubmit={handleSubmit} className="max-w-md">
                    <FormGroup>
                        <FormControl error={!!errors.name}>
                            <FormLabel htmlFor="name" required>Name</FormLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={formValues.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </FormControl>

                        <FormControl error={!!errors.email}>
                            <FormLabel htmlFor="email" required>Email</FormLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formValues.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                startIcon={<Search size={16} />}
                                endIcon={errors.email ? <X size={16} className="text-error-500" /> : formValues.email ? <Check size={16} className="text-success-500" /> : undefined}
                            />
                        </FormControl>

                        <FormControl error={!!errors.password}>
                            <FormLabel htmlFor="password" required>Password</FormLabel>
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={formValues.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                endIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="message">Message</FormLabel>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Enter your message"
                                value={formValues.message}
                                onChange={handleChange}
                                rows={4}
                            />
                        </FormControl>

                        <FormControl error={!!errors.category}>
                            <FormLabel htmlFor="category" required>Category</FormLabel>
                            <Select
                                value={formValues.category}
                                onValueChange={(value) => handleSelectChange('category', value)}
                                error={!!errors.category}
                                helperText={errors.category}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="top-band">Top Band</SelectItem>
                                    <SelectItem value="package-writer">Package Writer</SelectItem>
                                    <SelectItem value="speed-50">Speed 50</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="kannada" className="kannada">ಕನ್ನಡ ಇನ್‌ಪುಟ್</FormLabel>
                            <Input
                                id="kannada"
                                name="kannada"
                                className="kannada"
                                placeholder="ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..."
                                value={formValues.kannada}
                                onChange={handleChange}
                            />
                        </FormControl>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300"
                            >
                                Submit
                            </button>
                        </div>
                    </FormGroup>
                </form>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4">Input Variants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <FormLabel htmlFor="default-input">Default Input</FormLabel>
                            <Input id="default-input" placeholder="Default input" />
                        </div>

                        <div>
                            <FormLabel htmlFor="disabled-input">Disabled Input</FormLabel>
                            <Input id="disabled-input" placeholder="Disabled input" disabled />
                        </div>

                        <div>
                            <FormLabel htmlFor="error-input">Error Input</FormLabel>
                            <Input
                                id="error-input"
                                placeholder="Error input"
                                error
                                helperText="This field has an error"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <FormLabel htmlFor="with-icons">Input with Icons</FormLabel>
                            <Input
                                id="with-icons"
                                placeholder="Search..."
                                startIcon={<Search size={16} />}
                            />
                        </div>

                        <div>
                            <FormLabel htmlFor="textarea-default">Default Textarea</FormLabel>
                            <Textarea id="textarea-default" placeholder="Enter longer text..." />
                        </div>

                        <div>
                            <FormLabel htmlFor="textarea-error">Textarea with Error</FormLabel>
                            <Textarea
                                id="textarea-error"
                                placeholder="Error textarea"
                                error
                                helperText="This field has an error"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4">Select Variants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <FormLabel htmlFor="select-default">Default Select</FormLabel>
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
                    </div>

                    <div>
                        <FormLabel htmlFor="select-error">Select with Error</FormLabel>
                        <Select error helperText="Please select an option">
                            <SelectTrigger error>
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="option1">Option 1</SelectItem>
                                <SelectItem value="option2">Option 2</SelectItem>
                                <SelectItem value="option3">Option 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4">Kannada Text Support</h2>
                <div className="space-y-4">
                    <div>
                        <FormLabel htmlFor="kannada-input" className="kannada">ಕನ್ನಡ ಇನ್‌ಪುಟ್</FormLabel>
                        <Input
                            id="kannada-input"
                            className="kannada"
                            placeholder="ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..."
                        />
                    </div>

                    <div>
                        <FormLabel htmlFor="kannada-textarea" className="kannada">ಕನ್ನಡ ಟೆಕ್ಸ್ಟ್ ಏರಿಯಾ</FormLabel>
                        <Textarea
                            id="kannada-textarea"
                            className="kannada"
                            placeholder="ಇಲ್ಲಿ ಹೆಚ್ಚಿನ ಪಠ್ಯವನ್ನು ಬರೆಯಿರಿ..."
                        />
                    </div>

                    <div>
                        <FormLabel htmlFor="kannada-select" className="kannada">ಕನ್ನಡ ಆಯ್ಕೆ</FormLabel>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="ಆಯ್ಕೆ ಮಾಡಿ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="option1" className="kannada">ಆಯ್ಕೆ 1</SelectItem>
                                <SelectItem value="option2" className="kannada">ಆಯ್ಕೆ 2</SelectItem>
                                <SelectItem value="option3" className="kannada">ಆಯ್ಕೆ 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormInputShowcase;