import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '../button';

describe('Button Component', () => {
    it('renders correctly with default props', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-primary-500');
    });

    it('renders primary variant correctly', () => {
        render(<Button variant="primary">Primary</Button>);
        const button = screen.getByRole('button', { name: /primary/i });
        expect(button).toHaveClass('bg-primary-500');
        expect(button).toHaveClass('text-white');
    });

    it('renders secondary variant correctly', () => {
        render(<Button variant="secondary">Secondary</Button>);
        const button = screen.getByRole('button', { name: /secondary/i });
        expect(button).toHaveClass('bg-secondary-500');
        expect(button).toHaveClass('text-white');
    });

    it('renders tertiary variant correctly', () => {
        render(<Button variant="tertiary">Tertiary</Button>);
        const button = screen.getByRole('button', { name: /tertiary/i });
        expect(button).toHaveClass('bg-accent-500');
        expect(button).toHaveClass('text-white');
    });

    it('renders outline variant correctly', () => {
        render(<Button variant="outline">Outline</Button>);
        const button = screen.getByRole('button', { name: /outline/i });
        expect(button).toHaveClass('border');
        expect(button).toHaveClass('bg-white');
    });

    it('renders different sizes correctly', () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        let button = screen.getByRole('button', { name: /small/i });
        expect(button).toHaveClass('h-8');

        rerender(<Button size="default">Default</Button>);
        button = screen.getByRole('button', { name: /default/i });
        expect(button).toHaveClass('h-10');

        rerender(<Button size="lg">Large</Button>);
        button = screen.getByRole('button', { name: /large/i });
        expect(button).toHaveClass('h-12');
    });

    it('renders loading state correctly', () => {
        render(<Button isLoading>Loading</Button>);
        const button = screen.getByRole('button', { name: /loading/i });
        expect(button).toBeDisabled();
        expect(screen.getByText('Loading')).toBeInTheDocument();
        expect(button.querySelector('svg')).toBeInTheDocument(); // Check for loading spinner
    });

    it('renders loading state with custom text', () => {
        render(<Button isLoading loadingText="Please wait...">Submit</Button>);
        const button = screen.getByRole('button', { name: /please wait/i });
        expect(button).toBeDisabled();
        expect(screen.getByText('Please wait...')).toBeInTheDocument();
        expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('renders disabled state correctly', () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByRole('button', { name: /disabled/i });
        expect(button).toBeDisabled();
        expect(button).toHaveClass('disabled:opacity-50');
    });
});