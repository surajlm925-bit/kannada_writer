import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from '../input';

describe('Input Component', () => {
    it('renders correctly with default props', () => {
        render(<Input placeholder="Enter text" />);
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toBeInTheDocument();
        expect(input).toHaveClass('border-neutral-300');
    });

    it('applies custom className', () => {
        render(<Input className="custom-class" placeholder="Enter text" />);
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toHaveClass('custom-class');
    });

    it('renders in error state correctly', () => {
        render(<Input error placeholder="Enter text" />);
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toHaveClass('border-error-500');
    });

    it('renders helper text when provided', () => {
        render(<Input helperText="This is a hint" placeholder="Enter text" />);
        const helperText = screen.getByText('This is a hint');
        expect(helperText).toBeInTheDocument();
        expect(helperText).toHaveClass('text-neutral-500');
    });

    it('renders error helper text when in error state', () => {
        render(<Input error helperText="This field is required" placeholder="Enter text" />);
        const helperText = screen.getByText('This field is required');
        expect(helperText).toBeInTheDocument();
        expect(helperText).toHaveClass('text-error-500');
    });

    it('renders in disabled state correctly', () => {
        render(<Input disabled placeholder="Enter text" />);
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toBeDisabled();
        expect(input).toHaveClass('disabled:opacity-50');
    });

    it('renders with start icon correctly', () => {
        render(
            <Input
                startIcon={<span data-testid="start-icon">🔍</span>}
                placeholder="Search"
            />
        );
        const input = screen.getByPlaceholderText('Search');
        const icon = screen.getByTestId('start-icon');
        expect(icon).toBeInTheDocument();
        expect(input).toHaveClass('pl-10');
    });

    it('renders with end icon correctly', () => {
        render(
            <Input
                endIcon={<span data-testid="end-icon">✓</span>}
                placeholder="Enter text"
            />
        );
        const input = screen.getByPlaceholderText('Enter text');
        const icon = screen.getByTestId('end-icon');
        expect(icon).toBeInTheDocument();
        expect(input).toHaveClass('pr-10');
    });

    it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Input ref={ref} placeholder="Enter text" />);
        expect(ref.current).not.toBeNull();
        expect(ref.current?.tagName).toBe('INPUT');
    });

    it('passes HTML attributes to the input element', () => {
        render(
            <Input
                placeholder="Enter text"
                id="test-id"
                name="test-name"
                maxLength={10}
                required
            />
        );
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toHaveAttribute('id', 'test-id');
        expect(input).toHaveAttribute('name', 'test-name');
        expect(input).toHaveAttribute('maxlength', '10');
        expect(input).toHaveAttribute('required');
    });
});