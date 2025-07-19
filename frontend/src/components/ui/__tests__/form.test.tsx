import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormLabel, FormHelperText, FormControl, FormGroup } from '../form';

describe('Form Components', () => {
    describe('FormLabel', () => {
        it('renders correctly with default props', () => {
            render(<FormLabel>Name</FormLabel>);
            const label = screen.getByText('Name');
            expect(label).toBeInTheDocument();
            expect(label).toHaveClass('text-sm');
            expect(label).toHaveClass('font-medium');
        });

        it('applies custom className', () => {
            render(<FormLabel className="custom-class">Name</FormLabel>);
            const label = screen.getByText('Name');
            expect(label).toHaveClass('custom-class');
        });

        it('renders required indicator when required prop is true', () => {
            render(<FormLabel required>Name</FormLabel>);
            const requiredIndicator = screen.getByText('*');
            expect(requiredIndicator).toBeInTheDocument();
            expect(requiredIndicator).toHaveClass('text-error-500');
        });

        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLLabelElement>();
            render(<FormLabel ref={ref}>Name</FormLabel>);
            expect(ref.current).not.toBeNull();
            expect(ref.current?.tagName).toBe('LABEL');
        });

        it('passes HTML attributes to the label element', () => {
            render(<FormLabel htmlFor="test-id">Name</FormLabel>);
            const label = screen.getByText('Name');
            expect(label).toHaveAttribute('for', 'test-id');
        });
    });

    describe('FormHelperText', () => {
        it('renders correctly with default props', () => {
            render(<FormHelperText>Helper text</FormHelperText>);
            const helperText = screen.getByText('Helper text');
            expect(helperText).toBeInTheDocument();
            expect(helperText).toHaveClass('text-sm');
            expect(helperText).toHaveClass('text-neutral-500');
        });

        it('applies custom className', () => {
            render(<FormHelperText className="custom-class">Helper text</FormHelperText>);
            const helperText = screen.getByText('Helper text');
            expect(helperText).toHaveClass('custom-class');
        });

        it('renders in error state correctly', () => {
            render(<FormHelperText error>Error message</FormHelperText>);
            const helperText = screen.getByText('Error message');
            expect(helperText).toHaveClass('text-error-500');
        });

        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLParagraphElement>();
            render(<FormHelperText ref={ref}>Helper text</FormHelperText>);
            expect(ref.current).not.toBeNull();
            expect(ref.current?.tagName).toBe('P');
        });
    });

    describe('FormControl', () => {
        it('renders correctly with default props', () => {
            render(<FormControl>Form control content</FormControl>);
            const formControl = screen.getByTestId('form-control');
            expect(formControl).toBeInTheDocument();
            expect(formControl).toHaveClass('space-y-1');
        });

        it('applies custom className', () => {
            render(<FormControl className="custom-class">Form control content</FormControl>);
            const formControl = screen.getByTestId('form-control');
            expect(formControl).toHaveClass('custom-class');
        });

        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLDivElement>();
            render(<FormControl ref={ref}>Form control content</FormControl>);
            expect(ref.current).not.toBeNull();
            expect(ref.current?.tagName).toBe('DIV');
        });
    });

    describe('FormGroup', () => {
        it('renders correctly with default props', () => {
            render(<FormGroup>Form group content</FormGroup>);
            const formGroup = screen.getByTestId('form-group');
            expect(formGroup).toBeInTheDocument();
            expect(formGroup).toHaveClass('space-y-4');
        });

        it('applies custom className', () => {
            render(<FormGroup className="custom-class">Form group content</FormGroup>);
            const formGroup = screen.getByTestId('form-group');
            expect(formGroup).toHaveClass('custom-class');
        });

        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLDivElement>();
            render(<FormGroup ref={ref}>Form group content</FormGroup>);
            expect(ref.current).not.toBeNull();
            expect(ref.current?.tagName).toBe('DIV');
        });
    });
});