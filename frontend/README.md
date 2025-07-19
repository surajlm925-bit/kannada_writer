# Kannada AI Content Generator - Frontend

This directory contains the React frontend for the Kannada AI Content Generator application.

## UI Component Library

The application uses a custom UI component library built with React, TypeScript, and Tailwind CSS. The components are designed to be reusable, accessible, and support both English and Kannada text.

### Form Components

The form components include:

- `FormLabel`: Text label for form fields with optional required indicator
- `FormHelperText`: Helper text for form fields with error state support
- `FormControl`: Container for form field groups
- `FormGroup`: Container for multiple form controls

### Input Components

- `Input`: Text input with support for error states, helper text, and icons
- `Textarea`: Multi-line text input with similar features
- `Select`: Dropdown select component with Radix UI integration

### Button Components

- `Button`: Versatile button component with multiple variants and states
  - Variants: primary, secondary, tertiary, outline, ghost, link, destructive
  - Sizes: sm, default, lg, icon
  - States: loading, disabled

### Layout Components

- `Card`: Container for content with border and shadow
  - `CardHeader`: Header section for card title and description
  - `CardTitle`: Title component for cards
  - `CardDescription`: Description component for cards
  - `CardContent`: Main content area for cards
  - `CardFooter`: Footer section for card actions

### Feedback Components

- `Toast`: Notification component for user feedback
  - `ToastTitle`: Title component for toast notifications
  - `ToastDescription`: Description component for toast notifications
  - Variants: default, destructive, success, warning, info

- `Spinner`: Loading indicator component
  - Variants: primary, secondary, accent, neutral
  - Sizes: sm, default, lg, xl

## Development

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Testing

The project uses Vitest and React Testing Library for component testing.

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

### Testing Configuration

- Tests are configured in `vitest.config.ts`
- Global test setup is in `src/test/setup.ts`
- Type declarations for testing are in `src/test/vitest.d.ts`

## Kannada Language Support

The UI components are designed to support Kannada text rendering with appropriate font loading and text rendering optimizations. Use the `kannada` class on components that need to display Kannada text.

Example:

```tsx
<FormLabel className="kannada">ಕನ್ನಡ ಇನ್‌ಪುಟ್</FormLabel>
<Input className="kannada" placeholder="ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..." />
```

## Component Showcases

The project includes showcase components to demonstrate the usage of UI components:

- `ButtonShowcase`: Demonstrates button variants and states
- `FormInputShowcase`: Demonstrates form input components
- `DesignSystemShowcase`: Comprehensive showcase of all UI components