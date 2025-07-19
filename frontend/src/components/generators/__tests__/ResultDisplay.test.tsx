import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResultDisplay } from '../ResultDisplay';

// Mock clipboard API
Object.assign(navigator, {
    clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
    },
});

// Mock window.open for print functionality
const mockOpen = jest.fn();
window.open = mockOpen;

describe('ResultDisplay', () => {
    const mockProps = {
        content: 'Test content\nLine two\nLine three',
        generatorType: 'top-band',
        timestamp: '2023-01-01 12:00:00',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with content', () => {
        render(<ResultDisplay {...mockProps} />);
        expect(screen.getByText(/Test content/)).toBeInTheDocument();
        expect(screen.getByText(/Generated Content/)).toBeInTheDocument();
        expect(screen.getByText(/2023-01-01 12:00:00/)).toBeInTheDocument();
    });

    it('shows word and line count', () => {
        render(<ResultDisplay {...mockProps} />);
        expect(screen.getByText(/6 words/)).toBeInTheDocument();
        expect(screen.getByText(/3 lines/)).toBeInTheDocument();
    });

    it('handles copy functionality', async () => {
        render(<ResultDisplay {...mockProps} />);
        const copyButton = screen.getByText(/Copy/);
        fireEvent.click(copyButton);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('Test content'));

        // Should show "Copied" text after clicking
        expect(await screen.findByText(/Copied/)).toBeInTheDocument();
    });

    it('handles download functionality', () => {
        // Mock document.createElement and other DOM methods
        const mockLink = {
            href: '',
            download: '',
            click: jest.fn(),
        };

        jest.spyOn(document, 'createElement').mockImplementation(() => mockLink as any);
        jest.spyOn(document.body, 'appendChild').mockImplementation(() => { });
        jest.spyOn(document.body, 'removeChild').mockImplementation(() => { });

        render(<ResultDisplay {...mockProps} />);
        const downloadButton = screen.getByText(/Download/);
        fireEvent.click(downloadButton);

        expect(mockLink.download).toContain('kannada-top-band-');
        expect(mockLink.click).toHaveBeenCalled();
    });

    it('handles print functionality', () => {
        const mockPrintWindow = {
            document: {
                write: jest.fn(),
                close: jest.fn(),
            },
            focus: jest.fn(),
            print: jest.fn(),
        };

        mockOpen.mockReturnValue(mockPrintWindow);

        render(<ResultDisplay {...mockProps} />);
        const printButton = screen.getByText(/Print/);
        fireEvent.click(printButton);

        expect(mockOpen).toHaveBeenCalledWith('', '_blank');
        expect(mockPrintWindow.document.write).toHaveBeenCalled();
        expect(mockPrintWindow.focus).toHaveBeenCalled();
        expect(mockPrintWindow.print).toHaveBeenCalled();
    });

    it('formats top-band content correctly', () => {
        const props = {
            ...mockProps,
            content: 'Line 1\nLine 2\nLine 3',
            generatorType: 'top-band',
        };

        render(<ResultDisplay {...props} />);
        const contentElement = screen.getByText(/Line 1\n\nLine 2\n\nLine 3/);
        expect(contentElement).toBeInTheDocument();
    });

    it('formats speed-50 content correctly', () => {
        const props = {
            ...mockProps,
            content: 'Line 1\nLine 2\nLine 3',
            generatorType: 'speed-50',
        };

        render(<ResultDisplay {...props} />);
        expect(screen.getByText(/1\. Line 1/)).toBeInTheDocument();
        expect(screen.getByText(/2\. Line 2/)).toBeInTheDocument();
        expect(screen.getByText(/3\. Line 3/)).toBeInTheDocument();
    });
});