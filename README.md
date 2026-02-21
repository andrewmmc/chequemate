# ChequeMate - 香港支票金額轉換器

A Hong Kong Cheque Amount Converter that converts numerical amounts to both Chinese and English text formats for cheque writing.

## Features

- Convert numbers to Chinese cheque format (中文大寫)
- Convert numbers to English cheque format (English words)
- Cheque preview with formatted output
- Preset amounts for quick selection
- Conversion history with local storage persistence
- Support for amounts up to HKD 99,999,999,999.99

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling

## Project Structure

```
src/
├── components/
│   ├── AmountInput.tsx      # Number input component
│   ├── ChequePreview.tsx    # Cheque preview display
│   ├── ConversionResult.tsx # Conversion result display
│   ├── HistoryList.tsx      # Conversion history list
│   ├── QuickAmounts.tsx     # Preset amount buttons
│   └── CopyButton.tsx       # Reusable copy-to-clipboard button
├── domain/
│   └── amount.ts            # Shared amount constraints/rounding helpers
├── hooks/
│   ├── useHistory.ts        # History management hook
│   ├── useAmountInputState.ts
│   ├── useAmountUrlSync.ts
│   ├── useChequeConversion.ts
│   └── useClipboard.ts
├── utils/
│   ├── numberToChinese.ts   # Chinese number converter
│   ├── numberToEnglish.ts   # English number converter
│   └── storage.ts           # localStorage access utilities
└── pages/
    └── index.tsx            # Main page
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
- `npm run typecheck` - Run TypeScript type checking
- `npm run test:run` - Run tests once with Vitest

## License

Private project.
