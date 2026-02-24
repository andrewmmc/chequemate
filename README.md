# ChequeMate - 支票金額轉換器

A Cheque Amount Converter that converts numerical amounts to both Chinese and English text formats for cheque writing.

**Demo:** [chq.mmc.dev](https://chq.mmc.dev)

## Features

- Convert numbers to Chinese cheque format (中文大寫)
- Convert numbers to English cheque format (English words)
- Cheque preview with formatted output
- Preset amounts for quick selection
- Conversion history with local storage persistence
- Support for amounts up to HKD/RMB/USD 99,999,999,999.99
- Bilingual interface (Chinese/English) with locale persistence
- URL parameter support for sharing conversions (`?amount=1234.56&currency=HKD`)

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [Zod](https://zod.dev/) - Schema validation
- [Vitest](https://vitest.dev/) - Testing framework
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization

## Project Structure

```
src/
├── components/
│   ├── AmountInput.tsx      # Number input component
│   ├── ChequePreview.tsx    # Cheque preview display
│   ├── HistoryList.tsx      # Conversion history list
│   ├── QuickAmounts.tsx     # Preset amount buttons
│   ├── CopyButton.tsx       # Reusable copy-to-clipboard button
│   └── LocaleToggle.tsx     # Language toggle component
├── contexts/
│   └── LanguageContext.tsx  # Language/locale state management
├── domain/
│   └── amount.ts            # Shared amount constraints/rounding helpers
├── hooks/
│   ├── useHistory.ts        # History management hook
│   ├── useAmountInputState.ts
│   ├── useAmountUrlSync.ts
│   ├── useChequeConversion.ts
│   └── useClipboard.ts
├── schemas/
│   └── amount.ts            # Zod schema for amount validation
├── utils/
│   ├── numberToChinese.ts   # Chinese number converter
│   ├── numberToEnglish.ts   # English number converter
│   └── storage.ts           # localStorage access utilities
├── pages/
│   ├── _app.tsx             # App wrapper with providers
│   ├── _document.tsx        # Custom document
│   └── index.tsx            # Main page
└── styles/
    └── globals.css          # Global styles
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once

## License

MIT
