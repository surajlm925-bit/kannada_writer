import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '../Navbar';

// Mock window scroll events
const mockScrollTo = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: mockScrollTo });

describe('Navbar', () => {
    const renderWithRouter = (component) => {
        return render(
            <BrowserRouter>
                {component}
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the navbar with logo and navigation links', () => {
        renderWithRouter(<Navbar />);

        // Check for logo
        expect(screen.getByText('Kannada AI')).toBeInTheDocument();

        // Check for navigation links
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Generator')).toBeInTheDocument();
        expect(screen.getByText('Features')).toBeInTheDocument();
        expect(screen.getByText('How It Works')).toBeInTheDocument();
        expect(screen.getByText('Admin')).toBeInTheDocument();
    });

    it('toggles mobile menu when menu button is clicked', () => {
        renderWithRouter(<Navbar />);

        // Mobile menu should be hidden initially
        const mobileLinks = screen.queryAllByText('Home');
        expect(mobileLinks.length).toBe(1); // Only desktop link visible

        // Click the mobile menu button
        const menuButton = screen.getByLabelText('Toggle menu');
        fireEvent.click(menuButton);

        // Mobile menu should now be visible
        const mobileLinksAfterClick = screen.queryAllByText('Home');
        expect(mobileLinksAfterClick.length).toBe(2); // Both desktop and mobile links visible
    });

    it('changes background on scroll', () => {
        renderWithRouter(<Navbar />);

        // Initially should not have bg-white class
        const navbar = screen.getByRole('navigation');
        expect(navbar).toHaveClass('bg-transparent');

        // Simulate scroll
        global.scrollY = 20;
        fireEvent.scroll(window);

        // Should now have bg-white class
        expect(navbar).toHaveClass('bg-white');
    });
});