import React from 'react';
import { FormControl, FormLabel, FormHelperText } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

export interface GeneratorFormProps {
    type: 'top_band' | 'package_writer' | 'speed_50';
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
    error?: string;
}

// Base generator form component
export function GeneratorForm({
    type,
    value,
    onChange,
    onSubmit,
    isLoading,
    error
}: GeneratorFormProps) {
    // Common validation
    const validateInput = (input: string): string => {
        if (!input.trim()) {
            return 'Input cannot be empty';
        }
        return '';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateInput(value);
        if (!validationError) {
            onSubmit();
        }
    };

    // Get form configuration based on generator type
    const formConfig = getFormConfig(type);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormControl error={!!error}>
                <FormLabel htmlFor={`${type}-input`} required>
                    {formConfig.label}
                </FormLabel>

                <Textarea
                    id={`${type}-input`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={formConfig.placeholder}
                    className={`min-h-[120px] ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    rows={5}
                />

                {error && <FormHelperText error>{error}</FormHelperText>}

                <FormHelperText>
                    {formConfig.helperText}
                </FormHelperText>
            </FormControl>

            <div className="flex items-center gap-2">
                <Button
                    type="submit"
                    disabled={isLoading || !value.trim()}
                    className="w-full"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        formConfig.buttonText
                    )}
                </Button>
            </div>
        </form>
    );
}

// Specialized form for Top Band generator
export function TopBandForm(props: Omit<GeneratorFormProps, 'type'>) {
    return <GeneratorForm {...props} type="top_band" />;
}

// Specialized form for Package Writer generator
export function PackageWriterForm(props: Omit<GeneratorFormProps, 'type'>) {
    return <GeneratorForm {...props} type="package_writer" />;
}

// Specialized form for Speed 50 generator
export function Speed50Form(props: Omit<GeneratorFormProps, 'type'>) {
    return <GeneratorForm {...props} type="speed_50" />;
}

// Configuration for each generator type
function getFormConfig(type: string) {
    switch (type) {
        case 'top_band':
            return {
                label: 'Top Band Input',
                placeholder: 'Enter a news headline or topic for Top Band generation...',
                helperText: 'Enter a brief description or headline to generate a 6-line Kannada news headline block.',
                buttonText: 'Generate Top Band'
            };
        case 'package_writer':
            return {
                label: 'Package Writer Input',
                placeholder: 'Enter details for Package Writer generation...',
                helperText: 'Provide details about the news story to create a short Kannada AV package.',
                buttonText: 'Generate Package'
            };
        case 'speed_50':
            return {
                label: 'Speed 50 Input',
                placeholder: 'Enter topics for Speed 50 generation...',
                helperText: 'Enter topics to generate up to 50 one-line news snippets in Kannada.',
                buttonText: 'Generate Speed 50'
            };
        default:
            return {
                label: 'Input',
                placeholder: 'Enter your text here...',
                helperText: 'Provide input for content generation.',
                buttonText: 'Generate'
            };
    }
}