import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Footer from '../Footer';

describe('Footer', () => {
    const renderWithRouter = (component) => {
        return render(
            <BrowserRouter>
                {component}
            </BrowserRouter>
        );
    };

    // Mock current year to make test stable
    const mockDate = new Date(2025, 0, 1);
    const originalDate = global.Date;

    beforeEach(() => {
        global.Date = class extends Date {
            constructor() {
                return mockDate;
            }

            getFullYear() {
                return 2025;
            }
        };
    });

    afterEach(() => {
        global.Date = originalDate;
    });

    it('renders the footer with logo and description', () => {
        renderWithRouter(<Footer />);

        // Check for logo
        expect(screen.getByText('Kannada AI')).toBeInTheDocument();

        // Check for description
        expect(screen.getByText(/AI-powered Kannada content generation tools/i)).toBeInTheDocument();
    });

    it('renders quick links section', () => {
        renderWithRouter(<Footer />);

        expect(screen.getByText('Quick Links')).toBeInTheDocument();

        // Check for links
        const homeLinks = screen.getAllByText('Home');
        expect(homeLinks.length).toBeGreaterThanOrEqual(1);

        const generatorLinks = screen.getAllByText('Generator');
        expect(generatorLinks.length).toBeGreaterThanOrEqual(1);
    });

    it('renders generator tools section', () => {
        renderWithRouter(<Footer />);

        expect(screen.getByText('Generator Tools')).toBeInTheDocument();

        // Check for tool links
        expect(screen.getByText('Top Band')).toBeInTheDocument();
        expect(screen.getByText('Package Writer')).toBeInTheDocument();
        expect(screen.getByText('Speed 50')).toBeInTheDocument();
    });

    it('renders copyright with current year', () => {
        renderWithRouter(<Footer />);

        expect(screen.getByText(/© 2025 Kannada AI Content Generator/i)).toBeInTheDocument();
    });

    it('renders legal links', () => {
        renderWithRouter(<Footer />);

        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
        expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    });
});