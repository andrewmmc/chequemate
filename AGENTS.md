# AGENTS.md

This file provides guidance to AI coding tools when working with code in this repository.

## Project Overview

ChequeMate is a Hong Kong Cheque Amount Converter that converts numerical amounts to Chinese and English text formats for cheque writing.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js Pages Router application with TypeScript and Tailwind CSS 4.

### Core Conversion Logic

The two utility functions in `src/utils/` are the heart of the application:

- **numberToChinese.ts**: Converts numbers to Traditional Chinese cheque format (中文大寫) using formal cheque numerals (壹, 貳, 參, etc.). Output format: `港幣[amount]元[cents]角[...]分` or `港幣[amount]元正` for whole amounts.

- **numberToEnglish.ts**: Converts numbers to English cheque format. Output format: `Hong Kong Dollars [amount] And Cents [cents] Only`.

Both functions:

- Support amounts up to HKD 99,999,999,999.99
- Round to 2 decimal places
- Throw errors for negative amounts or amounts exceeding maximum

### State Management

- **useHistory hook** (`src/hooks/useHistory.ts`): Manages conversion history with localStorage persistence. Limits to 10 entries, deduplicates by amount.

### UI Components

All components are in `src/components/` and follow a simple presentational pattern with props. The main page (`src/pages/index.tsx`) orchestrates state and coordinates between components.

## Notes

- Uses React 19 with babel-plugin-react-compiler
- Tailwind CSS 4 with @tailwindcss/postcss
- No test framework is currently configured
