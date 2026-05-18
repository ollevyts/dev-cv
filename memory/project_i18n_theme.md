---
name: project-i18n-theme
description: i18n and theme system added to the portfolio (2026-05-18)
metadata:
  type: project
---

Custom i18n and next-themes dark/light mode added on 2026-05-18.

**i18n** — custom Zustand-based system (no next-intl routing needed for a portfolio):
- Messages: `src/shared/i18n/messages/en.json` + `uk.json`
- Store: `src/shared/i18n/localeStore.ts` (persisted to localStorage as `portfolio-locale`, default `uk`)
- Hook: `src/shared/i18n/useTranslation.ts` — `useTranslation()` returns `{ t, locale, setLocale }`
- Switcher UI: `src/shared/ui/LanguageSwitcher.tsx`

**Theme** — next-themes v0.4+ with class strategy:
- Provider: `src/shared/ui/Providers.tsx` wraps ThemeProvider (attribute="class", defaultTheme="dark")
- Toggle UI: `src/shared/ui/ThemeToggle.tsx` (uses `resolvedTheme` + mounted guard)
- Tailwind dark variant override in `globals.css`: `@custom-variant dark (&:where(.dark, .dark *))`
- Both controls live in the Sidebar above the footer

**Why:** User asked to add i18n and light/dark toggle.
**How to apply:** All new text should go through `t('key')`. Dark mode via `dark:` Tailwind prefix. Default theme is dark.
