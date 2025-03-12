# GoDaddy Take-Home Project

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Major Features](#major-features)
- [Future Improvements](#future-improvements)
- [Technology Choices](#technology-choices)
- [Library Selection Rationale](#library-selection-rationale)

## Prerequisites

- Node.js (version specified in `.nvmrc`)
- pnpm (v9.15.4 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sohamnandi77/godaddy-take-home-project
cd godaddy-take-home-project
```

2. Install dependencies:

```bash
pnpm install
```

## Running the Project

### Development Mode

```bash
pnpm dev
```

This will start the development server at `http://localhost:5173`

### Production Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Major Features

- **API Caching**: Efficiently caches API responses to reduce the number of requests and improve performance.
- **Pagination**: Enables users to navigate through large datasets with ease, improving user experience.
- **Keyboard Shortcuts for Navigation**: Enhances accessibility and efficiency by allowing users to navigate using keyboard shortcuts.
- **Dark Mode**: Provides a user-friendly dark mode option for better visibility in low-light conditions.
- **Mobile Responsive**: Ensures the application is fully functional and visually appealing on various screen sizes.
- **Accessibility**: Implements best practices for accessibility, ensuring the application is usable by everyone.
- **Shareable URL**: Uses the URL as a state manager, allowing users to share specific states of the application easily.

## Future Improvements

Due to time constraints, the following features were omitted but would be valuable additions:

- **Server-Side Rendering (SSR)**: Would improve initial page load times, SEO performance, and Web Vitals metrics. This is a great choice as most content is static and primarily uses GET API calls.
- **Auth Support For Better Ratelimiting**: Github API has a rate limit of 60 requests per hour for unauthenticated requests. Adding authentication would allow for more requests and better handling of rate limiting.
- **Enhanced Error States**: Implementation of proper error handling for scenarios like no data, rate limiting, and various API errors.
- **Loading Skeletons**: Shimmer effects for better user experience during loading states.
- **Card View for Repositories**: Adding an alternative card view and a toggle to switch between table and card views.
- **CI/CD Pipeline**: Automated testing and deployment pipelines would ensure code quality and streamline the deployment process.
- **Language Color Coding**: Visual indicators for programming languages used in repositories.
- **Contributors Section**: Detailed view of contributors in the repository details view.

## Technology Choices

### Core Technologies

- **React 19**: Latest version of React with improved performance and features
- **TypeScript**: For type safety and better developer experience
- **Vite**: Modern build tool offering extremely fast HMR and build times

### UI and Styling

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Radix UI**: Unstyled, accessible components for building high-quality design systems
- **Lucide React**: Beautiful, consistent icon set
- **class-variance-authority**: For creating type-safe UI components with variants

### State Management and Data Fetching

- **TanStack Router**: Type-safe routing solution with excellent DX
- **TanStack Table**: Powerful table/datagrid solution

### Development Tools

- **ESLint**: For code linting with TypeScript support
- **pnpm**: Fast, disk space efficient package manager

## Library Selection Rationale

### Radix UI

Selected for its unstyled, accessible components that provide excellent functionality while allowing complete styling freedom. Radix components follow WAI-ARIA design patterns and have built-in keyboard navigation, focus management, and screen reader support, making them ideal for building accessible applications.

### Tailwind CSS

Chosen for its utility-first approach that accelerates UI development without leaving the HTML. It provides a design system out of the box with consistent spacing, typography, and color scales. The ability to easily create responsive designs and the minimal CSS output through PurgeCSS make it an excellent choice for production applications.

### Zod

Implemented for runtime type validation that complements TypeScript's static type checking. Zod helps ensure data integrity when working with external APIs and form inputs, reducing potential runtime errors with minimal overhead.

### TanStack Table

Selected for its headless UI approach that provides powerful table functionality without imposing design constraints. Features like sorting, filtering, pagination, and virtualization are built-in, making it ideal for displaying and manipulating tabular data.

### TanStack Router

Chosen for its type-safe approach to routing that catches potential errors during development. The data-loading capabilities and seamless integration with React make it a powerful tool for creating robust single-page applications.

### TypeScript + Vite

This combination provides type safety during development while maintaining extremely fast build times and hot module replacement. Vite's ES modules-based dev server offers near-instantaneous startup and updates, significantly improving the development experience compared to webpack-based solutions.
