# Contributing to Construction Company Website

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository (if applicable)
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run the linter: `npm run lint`
5. Run the build: `npm run build`
6. Commit your changes: `git commit -m "feat: add my feature"`
7. Push to the branch: `git push origin feature/my-feature`
8. Open a Pull Request

## Development Setup

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

## Code Style

- Use TypeScript for all components
- Follow the existing code conventions (2-space indent, single quotes, semicolons)
- Use Tailwind CSS classes for styling (avoid inline styles where possible)
- Use CSS custom properties (`var(--brand)`, `var(--foreground)`, etc.) for themeable values
- Add `'use client'` directive only when needed (components using hooks or browser APIs)
- Keep components small and focused

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `style:` — Code style changes (formatting, etc.)
- `refactor:` — Code refactoring
- `perf:` — Performance improvements
- `test:` — Adding tests
- `chore:` — Maintenance tasks

## Project Structure

- `src/app/` — Next.js App Router pages
- `src/components/` — Reusable React components
- `src/i18n/` — Translation files (en.json, ne.json)
- `src/lib/` — Data files and utilities
- `public/assets/` — Static assets (images, etc.)

## Reporting Issues

When reporting bugs, please include:

1. Browser and version
2. Device (desktop/mobile)
3. Steps to reproduce
4. Expected behavior
5. Actual behavior
6. Screenshots if applicable

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
