import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScrollAnimation from '../ScrollAnimation';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
});
window.IntersectionObserver = mockIntersectionObserver;

describe('ScrollAnimation', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders children with initial opacity-0 class', () => {
        const { container } = render(
            <ScrollAnimation>
                <div data-testid="test-content">Test Content</div>
            </ScrollAnimation>
        );

        expect(screen.getByTestId('test-content')).toBeInTheDocument();
        expect(container.firstChild).toHaveClass('opacity-0');
    });

    it('applies the correct animation class based on prop', () => {
        const { container } = render(
            <ScrollAnimation animation="slide-up">
                <div>Test Content</div>
            </ScrollAnimation>
        );

        // Initially should have opacity-0
        expect(container.firstChild).toHaveClass('opacity-0');

        // Simulate intersection observer callback
        const [callback] = mockIntersectionObserver.mock.calls[0];
        callback([{ isIntersecting: true }]);

        // After intersection, should have the animation class
        expect(container.firstChild).toHaveClass('animate-slide-up');
    });

    it('applies delay class when delay prop is provided', () => {
        const { container } = render(
            <ScrollAnimation animation="fade-in" delay={200}>
                <div>Test Content</div>
            </ScrollAnimation>
        );

        // Simulate intersection observer callback
        const [callback] = mockIntersectionObserver.mock.calls[0];
        callback([{ isIntersecting: true }]);

        // Should have the delay class
        expect(container.firstChild).toHaveClass('animation-delay-200');
    });

    it('applies custom className when provided', () => {
        const { container } = render(
            <ScrollAnimation className="custom-class">
                <div>Test Content</div>
            </ScrollAnimation>
        );

        expect(container.firstChild).toHaveClass('custom-class');
    });
});