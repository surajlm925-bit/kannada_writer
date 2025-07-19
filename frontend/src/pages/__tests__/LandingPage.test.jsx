import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import LandingPage from '../LandingPage';

// Mock component to avoid issues with animations in tests
vi.mock('../../lib/design-system/animations.css', () => ({}));

describe('LandingPage', () => {
    const renderWithRouter = (component) => {
        return render(
            <BrowserRouter>
                {component}
            </BrowserRouter>
        );
    };

    it('renders the hero section with title and tagline', () => {
        renderWithRouter(<LandingPage />);

        // Check for title
        expect(screen.getByText('Kannada AI Content Generator')).toBeInTheDocument();

        // Check for tagline
        expect(screen.getByText(/Generate professional Kannada news content/i)).toBeInTheDocument();
    });

    it('renders call-to-action buttons', () => {
        renderWithRouter(<LandingPage />);

        // Check for CTA buttons
        expect(screen.getByText('Start Creating')).toBeInTheDocument();
        expect(screen.getByText('Learn More')).toBeInTheDocument();
    });

    it('renders the Kannada content preview', () => {
        renderWithRouter(<LandingPage />);

        // Check for preview section
        expect(screen.getByText('Kannada Content Preview')).toBeInTheDocument();

        // Check for Kannada text
        expect(screen.getByText('ಕನ್ನಡ ಸುದ್ದಿ ವಿಷಯ')).toBeInTheDocument();
        expect(screen.getByText('ನಿಮ್ಮ ಸುದ್ದಿ ವಿಷಯವನ್ನು ಸುಲಭವಾಗಿ ರಚಿಸಿ')).toBeInTheDocument();
    });
});
it('renders the feature highlights section with three features', () => {
    renderWithRouter(<LandingPage />);

    // Check for section title
    expect(screen.getByText('Powerful Content Generation Tools')).toBeInTheDocument();

    // Check for feature cards
    expect(screen.getByText('Top Band')).toBeInTheDocument();
    expect(screen.getByText('Package Writer')).toBeInTheDocument();
    expect(screen.getByText('Speed 50')).toBeInTheDocument();

    // Check for feature descriptions
    expect(screen.getByText('Generate 6-line Kannada news headline blocks')).toBeInTheDocument();
    expect(screen.getByText('Create short Kannada AV packages')).toBeInTheDocument();
    expect(screen.getByText('Generate up to 50 news lines quickly')).toBeInTheDocument();
});
it('renders the how-it-works section with three steps', () => {
    renderWithRouter(<LandingPage />);

    // Check for section title
    expect(screen.getByText('How It Works')).toBeInTheDocument();

    // Check for step titles
    expect(screen.getByText('Select Your Generator')).toBeInTheDocument();
    expect(screen.getByText('Enter Your Input')).toBeInTheDocument();
    expect(screen.getByText('Get Your Content')).toBeInTheDocument();

    // Check for step numbers
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
}); it('ren
ders the navigation and footer', () => {
    renderWithRouter(<LandingPage />);

// Check for navigation elements
expect(screen.getAllByText('Kannada AI').length).toBeGreaterThanOrEqual(1);
expect(screen.getAllByText('Home').length).toBeGreaterThanOrEqual(1);
expect(screen.getAllByText('Generator').length).toBeGreaterThanOrEqual(1);

// Check for footer elements
expect(screen.getByText('Quick Links')).toBeInTheDocument();
expect(screen.getByText('Generator Tools')).toBeInTheDocument();
expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });