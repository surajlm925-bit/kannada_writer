import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toast, ToastTitle, ToastDescription } from '../toast';

describe('Toast Components', () => {
    describe('Toast', () => {
        it('renders correctly with default props', () => {
            render(<Toast>Toast message</Toast>);
            const toast = screen.getByRole('alert');
            expect(toast).toBeInTheDocument();
            expect(toast).toHaveClass('bg-white');
            expect(toast).toHaveClass('border-neutral-200');
        });

        it('applies custom className', () => {
            render(<Toast className="custom-class">Toast message</Toast>);
            const toast = screen.getByRole('alert');
            expect(toast).toHaveClass('custom-class');
        });

        it('renders different variants correctly', () => {
            const { rerender } = render(<Toast variant="destructive">Error toast</Toast>);
            let toast = screen.getByRole('alert');
            expect(toast).toHaveClass('bg-error-50');
            expect(toast).toHaveClass('border-error-200');

            rerender(<Toast variant="success">Success toast</Toast>);
            toast = screen.getByRole('alert');
            expect(toast).toHaveClass('bg-success-50');
            expect(toast).toHaveClass('border-success-200');
        });

        it('does not render when visible is false', () => {
            render(<Toast visible={false}>Hidden toast</Toast>);
            expect(screen.queryByText('Hidden toast')).not.toBeInTheDocument();
        });

        it('calls onClose when close button is clicked', () => {
            const onClose = vi.fn();
            render(<Toast onClose={onClose}>Closable toast</Toast>);

            const closeButton = screen.getByLabelText('Close');
            fireEvent.click(closeButton);

            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });

    describe('ToastTitle', () => {
        it('renders correctly with default props', () => {
            render(<ToastTitle>Toast Title</ToastTitle>);
            const title = screen.getByText('Toast Title');
            expect(title).toBeInTheDocument();
            expect(title).toHaveClass('font-medium');
        });

        it('applies custom className', () => {
            render(<ToastTitle className="custom-class">Toast Title</ToastTitle>);
            const title = screen.getByText('Toast Title');
            expect(title).toHaveClass('custom-class');
        });
    });

    describe('ToastDescription', () => {
        it('renders correctly with default props', () => {
            render(<ToastDescription>Toast Description</ToastDescription>);
            const description = screen.getByText('Toast Description');
            expect(description).toBeInTheDocument();
            expect(description).toHaveClass('mt-1');
            expect(description).toHaveClass('text-sm');
        });

        it('applies custom className', () => {
            render(<ToastDescription className="custom-class">Toast Description</ToastDescription>);
            const description = screen.getByText('Toast Description');
            expect(description).toHaveClass('custom-class');
        });
    });

    describe('Toast composition', () => {
        it('renders a complete toast with all components', () => {
            render(
                <Toast>
                    <ToastTitle>Success!</ToastTitle>
                    <ToastDescription>Your changes have been saved.</ToastDescription>
                </Toast>
            );

            expect(screen.getByText('Success!')).toBeInTheDocument();
            expect(screen.getByText('Your changes have been saved.')).toBeInTheDocument();
        });
    });
});