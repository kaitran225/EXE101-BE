# Plan: Resize the overall app (everything slightly too big)

## 1. Global scale (single lever) — **recommended first**

- **Where:** `src/index.css`, inside `@layer base`.
- **Change:** Set a smaller root font size so all `rem`-based Tailwind sizes scale down:
  - `html { font-size: 14px; }` → ~87.5% of default (16px). Typography and spacing scale together.
  - Or `font-size: 93.75%;` → 15px for a subtler reduction.
- **Why:** One change affects the whole app consistently (text, padding, gaps, radii).

## 2. Layout spacing

- **GuideLayout** (`src/components/layout/GuideLayout.tsx`):
  - `m-3 gap-3` → `m-2 gap-2` (smaller margin and gap around header + main).
- **MainBoard** (`src/components/layout/MainBoard.tsx`):
  - `p-4 md:p-6 md:py-8` → `p-3 md:p-4 md:py-6` (less content padding).
- **DashboardHeader** (`src/components/layout/DashboardHeader.tsx`) (optional):
  - `px-4 md:px-5 py-2` → `px-3 md:px-4 py-1.5` if header still feels tall after (1).

## 3. Sidebar (optional)

- **DashboardSidebar** (`src/components/layout/DashboardSidebar.tsx`):
  - Expanded width: `w-64` → `w-56` if sidebar still feels wide after global scale.
  - Collapsed: keep `w-[72px]` or use `w-14` for rem consistency.
  - Internal padding (`p-3`, `py-2.5`, `px-3`) will already scale with root font-size.

## 4. Design tokens (optional)

- **index.css** `@theme`:
  - `--spacing-section` and `--spacing-container`: `1.5rem` → `1.25rem` (or `1rem`) if you want page-level spacing smaller without touching every component.

## 5. Order of implementation

1. Apply **global scale** (Step 1) and test.
2. Apply **layout spacing** (Step 2).
3. If still too big: **sidebar** (Step 3) and/or **tokens** (Step 4).

## 6. Rollback

- Revert `html { font-size: … }` to default (remove the rule or set `16px`).
- Revert layout class changes in GuideLayout, MainBoard, and optionally DashboardHeader/DashboardSidebar.
