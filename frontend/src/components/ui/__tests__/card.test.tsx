import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';

describe('Card Components', () => {
    describe('Card', () => {
        it('renders correctly with default props', () => {
            render(<Card data-testid="card">Card content</Card>);
            const card = screen.getByTestId('card');
            expect(card).toBeInTheDocument();
            expect(card).toHaveClass('rounded-lg');
            expect(card).toHaveClass('border');
            expect(card).toHaveClass('bg-white');
        });

        it('applies custom className', () => {
            render(<Card className="custom-class" data-testid="card">Card content</Card>);
            const card = screen.getByTestId('card');
            expect(card).toHaveClass('custom-class');
        });

        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLDivElement>();
            render(<Card ref={ref} data-testid="card">Card content</Card>);
            expect(ref.current).not.toBeNull();
            expect(ref.current?.tagName).toBe('DIV');
        });
    });

    describe('CardHeader', () => {
        it('renders correctly with default props', () => {
            render(<CardHeader data-testid="card-header">Header content</CardHeader>);
            const header = screen.getByTestId('card-header');
            expect(header).toBeInTheDocument();
            expect(header).toHaveClass('p-6');
        });

        it('applies custom className', () => {
            render(<CardHeader className="custom-class" data-testid="card-header">Header content</CardHeader>);
            const header = screen.getByTestId('card-header');
            expect(header).toHaveClass('custom-class');
        });
    });

    describe('CardTitle', () => {
        it('renders correctly with default props', () => {
            render(<CardTitle>Card Title</CardTitle>);
            const title = screen.getByText('Card Title');
            expect(title).toBeInTheDocument();
            expect(title).toHaveClass('text-lg');
            expect(title).toHaveClass('font-semibold');
        });

        it('applies custom className', () => {
            render(<CardTitle className="custom-class">Card Title</CardTitle>);
            const title = screen.getByText('Card Title');
            expect(title).toHaveClass('custom-class');
        });
    });

    describe('CardDescription', () => {
        it('renders correctly with default props', () => {
            render(<CardDescription>Card Description</CardDescription>);
            const description = screen.getByText('Card Description');
            expect(description).toBeInTheDocument();
            expect(description).toHaveClass('text-sm');
            expect(description).toHaveClass('text-neutral-500');
        });

        it('applies custom className', () => {
            render(<CardDescription className="custom-class">Card Description</CardDescription>);
            const description = screen.getByText('Card Description');
            expect(description).toHaveClass('custom-class');
        });
    });

    describe('CardContent', () => {
        it('renders correctly with default props', () => {
            render(<CardContent data-testid="card-content">Content</CardContent>);
            const content = screen.getByTestId('card-content');
            expect(content).toBeInTheDocument();
            expect(content).toHaveClass('p-6');
            expect(content).toHaveClass('pt-0');
        });

        it('applies custom className', () => {
            render(<CardContent className="custom-class" data-testid="card-content">Content</CardContent>);
            const content = screen.getByTestId('card-content');
            expect(content).toHaveClass('custom-class');
        });
    });

    describe('CardFooter', () => {
        it('renders correctly with default props', () => {
            render(<CardFooter data-testid="card-footer">Footer content</CardFooter>);
            const footer = screen.getByTestId('card-footer');
            expect(footer).toBeInTheDocument();
            expect(footer).toHaveClass('p-6');
            expect(footer).toHaveClass('pt-0');
        });

        it('applies custom className', () => {
            render(<CardFooter className="custom-class" data-testid="card-footer">Footer content</CardFooter>);
            const footer = screen.getByTestId('card-footer');
            expect(footer).toHaveClass('custom-class');
        });
    });

    describe('Card composition', () => {
        it('renders a complete card with all components', () => {
            render(
                <Card data-testid="card">
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>Card Content</CardContent>
                    <CardFooter>Card Footer</CardFooter>
                </Card>
            );

            expect(screen.getByTestId('card')).toBeInTheDocument();
            expect(screen.getByText('Card Title')).toBeInTheDocument();
            expect(screen.getByText('Card Description')).toBeInTheDocument();
            expect(screen.getByText('Card Content')).toBeInTheDocument();
            expect(screen.getByText('Card Footer')).toBeInTheDocument();
        });
    });
});