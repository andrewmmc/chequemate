# Refactor Plan (No Behavior Changes)

Baseline was verified with `npm run test:run` (66/66 passing).
Goal: improve structure while preserving all current outputs and features.

## 1. Freeze Current Behavior First

1. Add characterization tests for page-level flows in `src/pages/index.tsx`:
   - input typing/blur formatting
   - URL query sync (`?amount=...`)
   - debounce history insertion
   - preset + history selection behavior
2. Keep existing utility/hook tests unchanged in `src/utils/*.test.ts`, `src/hooks/useHistory.test.ts`, `src/schemas/amount.test.ts`.

## 2. Extract Domain Constants + Shared Amount Logic

1. Create a shared amount domain module (for example `src/domain/amount.ts`) with:
   - max amount constant
   - rounding helper
   - range validator
2. Reuse it from `src/schemas/amount.ts`, `src/utils/numberToChinese.ts`, and `src/utils/numberToEnglish.ts` to remove duplicated constraints and rounding logic.

## 3. Decompose `index.tsx` Into Focused Hooks

1. Split `src/pages/index.tsx` responsibilities into hooks:
   - `useAmountInputState` (input string + blur behavior)
   - `useAmountUrlSync` (read/write query param)
   - `useChequeConversion` (Chinese/English/error derived state)
2. Keep the page as orchestration only (wiring components and hooks), with no UI behavior change.

## 4. Refactor Reusable UI Logic

1. Deduplicate copy-to-clipboard logic currently repeated in:
   - `src/components/ChequePreview.tsx`
   - `src/components/ConversionResult.tsx`
2. Extract a shared `CopyButton` (and optional `useClipboard` hook) in `src/components/` or `src/hooks/`.

## 5. Isolate Persistence Concerns

1. Move localStorage reads/writes from `src/hooks/useHistory.ts` and `src/contexts/LanguageContext.tsx` into a small storage utility layer.
2. Keep storage keys and data format identical to avoid migration issues.

## 6. i18n + Metadata Consistency Cleanup

1. Remove hardcoded display strings where possible from `src/components/ChequePreview.tsx` (while preserving exact rendered wording).
2. Align document language handling (`src/pages/_document.tsx`) with runtime locale behavior from `src/contexts/LanguageContext.tsx`.

## 7. Code Quality + Safety Pass

1. Run and keep green:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run test:run`
2. Update stale docs in `README.md` (component names/structure) without changing functionality.

## Priority

Highest value first: Steps 2 and 3 give the biggest maintainability gain with minimal behavioral risk.
