import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Textarea } from '../textarea';

describe('Textarea Component', () => {
    it('renders correctly with default props', () => {
        render(<Textarea placeholder="Enter text" />);
        const textarea = screen.getByPlaceholderText('Enter text');
        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveClass('border-neutral-300');
    });

    it('applies custom className', () => {
        render(<Textarea className="custom-class" placeholder="Enter text" />);
        const textarea = screen.getByPlaceholderText('Enter text');
        expect(textarea).toHaveClass('custom-class');
    });

    it('renders in error state correctly', () => {
        render(<Textarea error placeholder="Enter text" />);
        const textarea = screen.getByPlaceholderText('Enter text');
        expect(textarea).toHaveClass('border-error-500');
    });

    it('renders helper text when provided', () => {
        render(<Textarea helperText="This is a hint" placeholder="Enter text" />);
        const helperText = screen.getByText('This is a hint');
        expect(helperText).toBeInTheDocument();
        expect(helperText).toHaveClass('text-neutral-500');
    });

    it('renders error helper text when in error state', () => {
        render(<Textarea error helperText="This field is required" placeholder="Enter text" />);
        const helperText = screen.getByText('This field is required');
        expect(helperText).toBeInTheDocument();
        expect(helperText).toHaveClass('text-error-500');
    });

    it('renders in disabled state correctly', () => {
        render(<Textarea disabled placeholder="Enter text" />);
        const textarea = screen.getByPlaceholderText('Enter text');
        expect(textarea).toBeDisabled();
        expect(textarea).toHaveClass('disabled:opacity-50');
    });

    it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLTextAreaElement>();
        render(<Textarea ref={ref} placeholder="Enter text" />);
        expect(ref.current).not.toBeNull();
        expect(ref.current?.tagName).toBe('TEXTAREA');
    });

    it('passes HTML attributes to the textarea element', () => {
        render(
            <Textarea
                placeholder="Enter text"
                id="test-id"
                name="test-name"
                maxLength={100}
                required
                rows={5}
            />
        );
        const textarea = screen.getByPlaceholderText('Enter text');
        expect(textarea).toHaveAttribute('id', 'test-id');
        expect(textarea).toHaveAttribute('name', 'test-name');
        expect(textarea).toHaveAttribute('maxlength', '100');
        expect(textarea).toHaveAttribute('required');
        expect(textarea).toHaveAttribute('rows', '5');
    });
});