# TRON Format Website

This repository contains the source code for the official website of **TRON (Token Reduced Object Notation)**.

See the website at [https://tron-format.github.io/](https://tron-format.github.io/).

## What is TRON?

TRON is a data serialization format that extends JSON. It is designed to be more compact by allowing the definition of "classes" (schemas) for objects, reducing the repetition of property names. TRON is a superset of JSON, meaning any valid JSON is also valid TRON.

For a full technical explanation, please refer to the [Specification](./SPEC.md).

## Website Features

The website provides:

*   **Specification**: The complete documentation of the TRON format.
*   **Playground**: An interactive editor to experiment with TRON, convert between TRON and JSON, and compare token counts.
*   **SDKs**: Information on supporting libraries for different programming languages.

## Development Setup

To run this project locally:

1.  **Install Dependencies**
    ```bash
    pnpm install
    ```

2.  **Start Development Server**
    ```bash
    pnpm dev
    ```

3.  **Build for Production**
    ```bash
    pnpm build
    ```

4.  **Preview Production Build**
    ```bash
    pnpm preview
    ```

## License

[MIT](./LICENSE) License © 2025-PRESENT Tim Huang
