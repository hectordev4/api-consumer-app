# API Consumer App

A fast, lightweight app for exploring APIs and inspecting response data in a clean interface.

## Overview

This project helps you quickly send HTTP requests to any endpoint, inspect the response body, headers, status, and error details, and iterate on API calls without leaving the browser.

## Features

- Send requests to any public API endpoint
- Show response body, HTTP status, headers, and timing
- Loading and error states for better feedback
- Simple request form for quick testing
- Clean, reusable architecture for future extension

## Tech Stack

- React
- JavaScript / TypeScript
- Fetch API
- Node.js + npm / yarn

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn installed

### Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

### Run locally

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

### Build for production

```bash
npm run build
```

## How to Use

1. Launch the app locally.
2. Enter the API endpoint URL you want to test.
3. Submit the request.
4. Review the response payload, status code, headers, and any error messages.
5. Adjust the endpoint or headers and retry.

## Project Structure

- src — app source code
- `public/` — static assets
- package.json — dependencies and scripts
- README.md — project documentation

## Available Scripts

- `npm start` — start the development server
- `npm test` — run tests
- `npm run build` — create a production build
- `npm run lint` — run lint checks

## Tips

- Use a sample endpoint like `https://jsonplaceholder.typicode.com/posts`
- If your API needs authentication, add headers or auth details in the request layer
- Use this app for quick API validation during development

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Open a pull request

## License

`MIT License`
