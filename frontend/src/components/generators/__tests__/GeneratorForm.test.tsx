import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GeneratorForm, TopBandForm, PackageWriterForm, Speed50Form } from '../GeneratorForm';

describe('GeneratorForm', () => {
    const mockProps = {
        type: 'top_band' as const,
        value: '',
        onChange: jest.fn(),
        onSubmit: jest.fn(),
        isLoading: false,
    };

    it('renders correctly with default props', () => {
        render(<GeneratorForm {...mockProps} />);
        expect(screen.getByLabelText(/Top Band Input/i)).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('shows error message when provided', () => {
        render(<GeneratorForm {...mockProps} error="Test error" />);
        expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    it('calls onChange when input changes', () => {
        render(<GeneratorForm {...mockProps} />);
        const input = screen.getByLabelText(/Top Band Input/i);
        fireEvent.change(input, { target: { value: 'test input' } });
        expect(mockProps.onChange).toHaveBeenCalledWith('test input');
    });

    it('calls onSubmit when form is submitted', () => {
        const props = { ...mockProps, value: 'test input' };
        render(<GeneratorForm {...props} />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(mockProps.onSubmit).toHaveBeenCalled();
    });

    it('shows loading state when isLoading is true', () => {
        render(<GeneratorForm {...mockProps} isLoading={true} />);
        expect(screen.getByText(/Generating/i)).toBeInTheDocument();
    });
});

describe('Specialized Form Components', () => {
    const mockProps = {
        value: '',
        onChange: jest.fn(),
        onSubmit: jest.fn(),
        isLoading: false,
    };

    it('renders TopBandForm correctly', () => {
        render(<TopBandForm {...mockProps} />);
        expect(screen.getByLabelText(/Top Band Input/i)).toBeInTheDocument();
        expect(screen.getByText(/Generate Top Band/i)).toBeInTheDocument();
    });

    it('renders PackageWriterForm correctly', () => {
        render(<PackageWriterForm {...mockProps} />);
        expect(screen.getByLabelText(/Package Writer Input/i)).toBeInTheDocument();
        expect(screen.getByText(/Generate Package/i)).toBeInTheDocument();
    });

    it('renders Speed50Form correctly', () => {
        render(<Speed50Form {...mockProps} />);
        expect(screen.getByLabelText(/Speed 50 Input/i)).toBeInTheDocument();
        expect(screen.getByText(/Generate Speed 50/i)).toBeInTheDocument();
    });
});