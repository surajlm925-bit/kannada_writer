# Kannada AI Content Generator Design System

This design system provides a consistent set of components, styles, and patterns for building the Kannada AI Content Generator application.

## Core Principles

1. **Consistency**: Maintain visual and interaction consistency across the application
2. **Accessibility**: Ensure all components are accessible to all users
3. **Responsiveness**: Design for all device sizes and screen types
4. **Internationalization**: Support both English and Kannada languages
5. **Performance**: Optimize for speed and efficiency

## Color Palette

### Primary Colors

- Primary Blue: `#3B82F6` - Used for primary actions, links, and key UI elements
- Secondary Green: `#10B981` - Used for success states, secondary actions
- Accent Purple: `#8B5CF6` - Used for highlighting and accent elements

Each color has a complete scale from 50-950 for various shades and tints, as defined in the Tailwind configuration.

### Neutral Colors

- Background: `#FFFFFF` (light) / `#1F2937` (dark)
- Text: `#1F2937` (light) / `#F9FAFB` (dark)
- Muted: `#9CA3AF`
- Full neutral scale from 50-950 available

### Semantic Colors

- Error: `#EF4444` - Used for error states and destructive actions
- Warning: `#F59E0B` - Used for warning states and cautionary information
- Success: `#10B981` - Used for success states and confirmations

## Typography

### Font Families
- Primary: Inter (sans-serif)
- Kannada: Noto Sans Kannada

### Font Sizes
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Components

### Form Components
- Button
- Input
- Textarea
- Select
- Checkbox
- Radio

### Layout Components
- Card
- Container
- Grid
- Divider

### Feedback Components
- Toast
- Spinner
- Alert
- Progress

### Navigation Components
- Tabs
- Sidebar
- Breadcrumb
- Pagination

## Usage

Import components from the design system:

```tsx
import { Button, Card, Input } from '../lib/design-system';

function MyComponent() {
  return (
    <Card>
      <h2>My Form</h2>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Tailwind CSS Configuration

The design system is built on top of Tailwind CSS with custom configuration. The configuration extends Tailwind's default theme with our custom colors, fonts, and other design tokens.

## Kannada Language Support

All components support Kannada text rendering. Use the `kannada` class to apply Kannada-specific typography settings:

```tsx
<p className="kannada">ಕನ್ನಡ ಪಠ್ಯ</p>
```

## Theme Support

The design system supports both light and dark themes. Use the `ThemeProvider` component to enable theme switching:

```tsx
import { ThemeProvider } from '../lib/design-system';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## Accessibility

All components are designed with accessibility in mind, following WCAG 2.1 guidelines. They include:

- Proper ARIA attributes
- Keyboard navigation support
- Sufficient color contrast
- Focus management

## Responsive Design

All components are responsive by default and adapt to different screen sizes. Use Tailwind's responsive utilities to customize behavior at different breakpoints.