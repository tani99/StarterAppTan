# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/simulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run web version

### Code Quality
- `npm run compile` - TypeScript type checking
- `npm run lint` - Run ESLint with auto-fix
- `npm run lint:check` - Run ESLint without auto-fix

### Testing
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:maestro` - Run end-to-end Maestro tests

### Building
- `npm run build:ios:sim` - Build iOS for simulator
- `npm run build:ios:dev` - Build iOS for device (development)
- `npm run build:android:sim` - Build Android for simulator
- `npm run build:android:dev` - Build Android for device (development)

### Running Single Tests
To run a specific test file: `npm test -- path/to/test.test.ts`
To run tests matching a pattern: `npm test -- --testNamePattern="pattern"`

## Architecture Overview

This is a React Native Expo application built with the Ignite CLI boilerplate, following modern React Native patterns with comprehensive TypeScript support.

### Key Architectural Patterns

**Provider-Based Architecture**: The app uses multiple context providers for theme, keyboard handling, and safe area management. All providers are set up in `app/app.tsx`.

**Preset-Based Components**: UI components in `app/components/` use preset patterns for consistent styling variations. Each component accepts a `preset` prop for different visual configurations.

**Themed Styling**: Dynamic styling system with light/dark mode support via `app/theme/context.tsx`. Use `useAppTheme()` hook to access theme values.

**Path Aliases**: Import paths use `@/` prefix (configured in `tsconfig.json`):
- `@/components` → `app/components`
- `@/screens` → `app/screens`
- `@/theme` → `app/theme`
- `@/utils` → `app/utils`
- etc.

### Core Directories

**`app/components/`**: Reusable UI components with preset-based styling. Key components:
- `Screen.tsx` - Screen wrapper with multiple layout presets
- `Text.tsx`, `Button.tsx` - Core themed UI elements
- `Header.tsx`, `ListItem.tsx` - Complex layout components
- `Toggle/` - Complete toggle component system

**`app/screens/`**: Screen components that compose the app's pages. Use the `Screen` component wrapper for consistent layouts.

**`app/navigators/`**: React Navigation v7 setup with type-safe navigation. Navigation types are defined in `AppStackParamList`.

**`app/theme/`**: Comprehensive theming system with:
- Context provider for theme state
- Color palettes for light/dark modes
- Typography definitions using expo-google-fonts
- Spacing and timing tokens

**`app/services/`**: API integration layer using Apisauce. Environment-specific configuration in `app/config/`.

**`app/i18n/`**: Internationalization with i18next, supporting 7 languages with RTL support for Arabic.

**`app/utils/`**: Utility functions for storage (MMKV), date formatting, safe area handling, and platform-specific helpers.

**`plans/`**: Feature planning directory containing design and implementation plans for new features. Always create a plan here before implementing complex features.

### Development Guidelines

**Feature Planning**: Before implementing new features, create a detailed plan in the `plans/` directory. This should include:
- Feature overview and requirements
- Technical design and architecture decisions
- Implementation steps broken into small tasks
- Testing strategy and considerations
- See `plans/README.md` for the complete planning template

**Development Workflow**: Use git for version control and make small, incremental changes. After implementing any feature or fix:
1. Run `npm run compile` to check TypeScript errors
2. Run `npm run lint` to fix code style issues
3. Run `npm test` to ensure tests pass
4. Test the changes in the app (iOS/Android/web as appropriate)
5. Commit the validated changes with a descriptive commit message
6. Continue with the next small increment

**Component Creation**: When creating new components, follow the preset pattern established in existing components. Reference `app/components/Text.tsx` or `app/components/Button.tsx` for examples.

**Screen Development**: Always wrap screens with the `Screen` component from `@/components`. Use appropriate presets (`fixed`, `scroll`, `auto`) based on content needs.

**Styling**: Use themed functions for dynamic styling. Access theme via `useAppTheme()` hook. Reference existing themed components for patterns.

**Navigation**: Type-safe navigation is enforced. Add new routes to `AppStackParamList` type in the navigator files.

**API Integration**: Use the existing API service in `app/services/api/`. Follow the established pattern for adding new endpoints.

**Testing**: Tests use Jest with React Native Testing Library. Setup is in `test/setup.ts`. Follow existing test patterns in the `test/` directory.

### Storage and State Management

**Persistent Storage**: Uses MMKV via the storage utilities in `app/utils/storage/`. Preferred for app preferences and user settings.

**Theme Persistence**: Theme preferences are automatically persisted and restored on app launch.

**Navigation State**: Navigation state is persisted and restored using MMKV storage.

### Important Configuration Files

**`tsconfig.json`**: TypeScript configuration with path aliases and strict type checking enabled.

**`app.config.ts`**: Expo configuration with iOS privacy manifests and splash screen plugin.

**`babel.config.js`**: Babel configuration for React Native and Expo compatibility.

**`jest.config.js`**: Jest configuration using jest-expo preset with test setup file.

### Build Requirements

**iOS Builds**: Requires EAS CLI and proper provisioning profiles. Use the npm scripts for different build profiles (development, preview, production).

**Android Builds**: Configured for local builds with EAS. The `adb` npm script sets up port forwarding for development.

**Development Client**: This app uses Expo development client, not Expo Go. Must build development version before running on device.