# Contributing to [Project Name]

First off, thank you for considering contributing! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code.

**In summary**: Be respectful, inclusive, and constructive.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, check existing issues. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Environment details** (OS, version, etc.)
- **Screenshots** if applicable

### 💡 Suggesting Features

Feature requests are welcome! Please include:

- **Use case**: Why is this feature needed?
- **Proposed solution**: What would you like to see?
- **Alternatives**: Have you considered other solutions?

### 🔧 Pull Requests

We love pull requests! Here's how:

1. Fork the repo
2. Create your branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit with descriptive message
6. Push to your fork
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/project.git
cd project

# Install dependencies
npm install

# Create branch
git checkout -b feature/your-feature

# Run in development
npm run dev

# Run tests
npm test
```

## Pull Request Process

1. **Update documentation** if you change functionality
2. **Add tests** for new features
3. **Follow style guidelines** (linting must pass)
4. **Write clear commit messages**
5. **Link related issues** in the PR description

### Commit Message Format

```
type(scope): brief description

[optional body]
[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
```
feat(auth): add OAuth2 support
fix(api): handle null response from external service
docs(readme): update installation instructions
```

## Style Guidelines

### Code Style

- Run `npm run lint` before committing
- Follow existing patterns in the codebase
- Add comments for complex logic
- Use descriptive variable names

### Documentation Style

- Use present tense ("Add feature" not "Added feature")
- Keep lines under 100 characters when possible
- Include code examples for new features

## Questions?

Open an issue with the `question` label or reach out to maintainers.

---

Thank you for contributing! 🙏
