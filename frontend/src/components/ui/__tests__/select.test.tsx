import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../select';

describe('Select Component', () => {
    const renderSelect = (props = {}) => {
        return render(
            <Select {...props}>
                <SelectTrigger data-testid="select-trigger">
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="option1" data-testid="option-1">Option 1</SelectItem>
                    <SelectItem value="option2" data-testid="option-2">Option 2</SelectItem>
                    <SelectItem value="option3" data-testid="option-3">Option 3</SelectItem>
                </SelectContent>
            </Select>
        );
    };

    it('renders correctly with default props', () => {
        renderSelect();
        const trigger = screen.getByTestId('select-trigger');
        expect(trigger).toBeInTheDocument();
        expect(screen.getByText('Select an option')).toBeInTheDocument();
        // Content is hidden initially
        expect(screen.queryByTestId('option-1')).not.toBeInTheDocument();
    });

    it('shows options when clicked', () => {
        renderSelect();
        const trigger = screen.getByTestId('select-trigger');

        fireEvent.click(trigger);

        expect(screen.getByTestId('option-1')).toBeInTheDocument();
        expect(screen.getByTestId('option-2')).toBeInTheDocument();
        expect(screen.getByTestId('option-3')).toBeInTheDocument();
    });

    it('selects an option when clicked', () => {
        renderSelect();
        const trigger = screen.getByTestId('select-trigger');

        fireEvent.click(trigger);
        fireEvent.click(screen.getByTestId('option-2'));

        // After selection, the dropdown is closed and the value is displayed in the trigger
        expect(screen.queryByTestId('option-1')).not.toBeInTheDocument(); // Content is hidden after selection
        expect(screen.getByText('option2')).toBeInTheDocument(); // The value is displayed
    });

    it('calls onValueChange when an option is selected', () => {
        const onValueChange = vi.fn();
        renderSelect({ onValueChange });

        const trigger = screen.getByTestId('select-trigger');
        fireEvent.click(trigger);
        fireEvent.click(screen.getByTestId('option-3'));

        expect(onValueChange).toHaveBeenCalledWith('option3');
    });

    it('renders in disabled state correctly', () => {
        renderSelect({ disabled: true });
        const trigger = screen.getByTestId('select-trigger');
        expect(trigger).toBeDisabled();
    });

    it('renders in error state correctly', () => {
        renderSelect({ error: true });
        const trigger = screen.getByTestId('select-trigger');
        expect(trigger).toHaveClass('border-error-500');
    });

    it('renders helper text when provided', () => {
        renderSelect({ helperText: 'Please select an option' });
        expect(screen.getByText('Please select an option')).toBeInTheDocument();
    });

    it('renders error helper text when in error state', () => {
        renderSelect({ error: true, helperText: 'This field is required' });
        const helperText = screen.getByText('This field is required');
        expect(helperText).toBeInTheDocument();
        expect(helperText).toHaveClass('text-error-500');
    });

    it('uses controlled value when provided', () => {
        renderSelect({ value: 'option2' });
        // Check that the value is displayed in the trigger
        expect(screen.getByText('option2')).toBeInTheDocument();
    });

    it('uses defaultValue when provided', () => {
        renderSelect({ defaultValue: 'option3' });
        // Check that the value is displayed in the trigger
        expect(screen.getByText('option3')).toBeInTheDocument();
    });
});