import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from '../spinner';

describe('Spinner Component', () => {
    it('renders correctly with default props', () => {
        render(<Spinner />);
        const spinner = screen.getByRole('status');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveClass('animate-spin');
        expect(spinner).toHaveClass('text-primary-500');
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<Spinner className="custom-class" />);
        const spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('custom-class');
    });

    it('renders different variants correctly', () => {
        const { rerender } = render(<Spinner variant="primary" />);
        let spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('text-primary-500');

        rerender(<Spinner variant="secondary" />);
        spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('text-secondary-500');

        rerender(<Spinner variant="accent" />);
        spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('text-accent-500');

        rerender(<Spinner variant="neutral" />);
        spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('text-neutral-500');
    });

    it('renders different sizes correctly', () => {
        const { rerender } = render(<Spinner size="sm" />);
        let spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('h-4');
        expect(spinner).toHaveClass('w-4');

        rerender(<Spinner size="default" />);
        spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('h-6');
        expect(spinner).toHaveClass('w-6');

        rerender(<Spinner size="lg" />);
        spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('h-8');
        expect(spinner).toHaveClass('w-8');

        rerender(<Spinner size="xl" />);
        spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('h-12');
        expect(spinner).toHaveClass('w-12');
    });

    it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Spinner ref={ref} />);
        expect(ref.current).not.toBeNull();
        expect(ref.current?.tagName).toBe('DIV');
    });
});