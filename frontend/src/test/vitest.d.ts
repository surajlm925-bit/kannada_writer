/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
    namespace Vi {
        interface Assertion<T = any> extends TestingLibraryMatchers<T, void> { }
        interface AsymmetricMatchersContaining extends TestingLibraryMatchers<any, void> { }
    }
}