# UI Component Library

This directory contains reusable UI components for the Kannada AI Content Generator application. The components are built with React, TypeScript, and Tailwind CSS, with accessibility in mind.

## Form Components

### FormLabel

A text label for form fields with optional required indicator.

```tsx
<FormLabel htmlFor="name" required>Name</FormLabel>
```

**Props:**
- `required`: Adds a red asterisk to indicate a required field
- All standard HTML label attributes are supported

### FormHelperText

Helper text for form fields with error state support.

```tsx
<FormHelperText>Enter your full name</FormHelperText>
<FormHelperText error>This field is required</FormHelperText>
```

**Props:**
- `error`: Changes the text color to the error color
- All standard HTML paragraph attributes are supported

### FormControl

Container for form field groups that provides proper spacing.

```tsx
<FormControl error={!!errors.email}>
    <FormLabel htmlFor="email" required>Email</FormLabel>
    <Input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        error={!!errors.email}
        helperText={errors.email}
    />
</FormControl>
```

**Props:**
- `error`: Indicates an error state (can be used to pass down to children)
- All standard HTML div attributes are supported

### FormGroup

Container for multiple form controls with proper spacing.

```tsx
<FormGroup>
    <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" name="name" />
    </FormControl>
    <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" name="email" type="email" />
    </FormControl>
</FormGroup>
```

**Props:**
- All standard HTML div attributes are supported

## Usage with Kannada Text

All form components support Kannada text rendering. Use the `kannada` class to ensure proper font rendering:

```tsx
<FormLabel htmlFor="kannada-input" className="kannada">ಕನ್ನಡ ಇನ್‌ಪುಟ್</FormLabel>
<Input
    id="kannada-input"
    className="kannada"
    placeholder="ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..."
/>
```

## Testing

Each component has comprehensive unit tests using Vitest and React Testing Library. Tests cover:

- Default rendering
- Custom class names
- Error states
- Required indicators
- Ref forwarding
- HTML attribute passing

To run tests:

```bash
npm test
```

## Showcase Components

To see examples of these components in action, refer to:

- `FormInputShowcase.tsx`: Demonstrates form input components
- `DesignSystemShowcase.tsx`: Comprehensive showcase of all UI components