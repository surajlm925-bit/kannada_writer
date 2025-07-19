import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FeatureCard from '../FeatureCard';

describe('FeatureCard', () => {
    const defaultProps = {
        title: 'Test Feature',
        description: 'Test Description',
        content: 'Test content paragraph',
        icon: <span data-testid="test-icon">Icon</span>,
        iconBgColor: 'bg-primary-100',
        iconColor: 'text-primary-500',
        exampleText: 'Example text'
    };

    it('renders the feature card with all props', () => {
        render(<FeatureCard {...defaultProps} />);

        expect(screen.getByText('Test Feature')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('Test content paragraph')).toBeInTheDocument();
        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        expect(screen.getByText('Example text')).toBeInTheDocument();
    });

    it('renders without example text when not provided', () => {
        const propsWithoutExample = { ...defaultProps, exampleText: undefined };
        const { container } = render(<FeatureCard {...propsWithoutExample} />);

        expect(screen.getByText('Test Feature')).toBeInTheDocument();
        expect(screen.queryByText('Example text')).not.toBeInTheDocument();

        // Check that the example container is not rendered
        const exampleContainers = container.querySelectorAll('.bg-neutral-50');
        expect(exampleContainers.length).toBe(0);
    });

    it('applies custom background and icon colors', () => {
        const customProps = {
            ...defaultProps,
            iconBgColor: 'bg-secondary-100',
            iconColor: 'text-secondary-500'
        };

        const { container } = render(<FeatureCard {...customProps} />);

        const iconContainer = container.querySelector('.bg-secondary-100');
        expect(iconContainer).toBeInTheDocument();

        const icon = container.querySelector('.text-secondary-500');
        expect(icon).toBeInTheDocument();
    });
});