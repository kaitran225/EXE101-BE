# Dashboard layout – full analysis

Reference: PBD-style dashboard (dark sidebar, floating main panel, warm background).

---

## 1. Global structure (3 elements only)

| Layer | Element | Role |
|-------|---------|------|
| **Background** | Viewport fill | Single solid colour (e.g. warm brown `#8B7355` or neutral-200). No content. |
| **1 – Bottom** | **Sidebar** | Full height, flush left. Dark. Visually *behind* the main panel. No border-radius on container. |
| **2 – Top** | **Main panel** | One rounded rectangle containing **header** + **main board**. Overlaps sidebar slightly. `z-index` above sidebar. |

So the only layout “elements” are: **sidebar**, **header** (inside main panel), **main board** (inside main panel). The main panel is one wrapper (header + board) that floats on top.

---

## 2. Background (outside the UI)

- **Role:** Define the “canvas” the dashboard sits on.
- **Style:** One solid colour (warm brown in reference).
- **Implementation:** Single wrapper (e.g. `GuideLayout` root) with `bg-*` and no padding where the sidebar extends (sidebar is flush to edges).

---

## 3. Sidebar (left panel) – bottom layer

### 3.1 Container

- Full viewport height.
- Flush to left (and usually top/bottom) – no outer padding on that side.
- Dark grey/black (`bg-neutral-800` / `bg-neutral-900`).
- **No** border-radius on the outer sidebar container (so it reads as one layer below).
- `z-index` lower than the main panel.

### 3.2 Content structure (top → bottom)

1. **Brand**
   - Logo (icon + wordmark, e.g. “PBD” / “∞ together”).
   - Often a link to dashboard/home.

2. **Primary nav**
   - Vertical list.
   - Each item: icon + label.
   - **Active:** distinct background (e.g. orange/amber) and contrast text.

3. **Spacer**
   - Flexible space so the next block sits at the bottom.

4. **User block**
   - Avatar (circle).
   - Name (e.g. “Elizabeth”).
   - Optional status (“Active”) and chevron.

5. **Theme toggle** (optional)
   - Light / Dark switch.

### 3.3 Behaviour

- Can support a collapsed state (icon-only, narrow width).
- All interactive elements (links, buttons) have clear hover/active states.

---

## 4. Main panel (header + main board) – top layer

### 4.1 Container

- One wrapper for **header** + **main board**.
- **Shape:** Rounded rectangle (`rounded-xl` / `rounded-2xl`).
- **Position:** Slightly overlaps the sidebar (e.g. `-ml-3` or similar) so it clearly sits “on top”.
- **Elevation:** `shadow-lg` (or similar).
- **Background:** Light (e.g. white or off-white).
- **z-index** higher than sidebar (e.g. `z-10`).

### 4.2 Header (inside main panel)

- **Placement:** Top of the main panel; first child of the rounded wrapper.
- **Style:** Matches the main panel (e.g. white), with **rounded top corners** (`rounded-t-xl`) so the panel’s top edge is one continuous rounded shape.
- **Content (reference):**
  - One prominent **page title** (e.g. “Dashboard”) – large, bold, often centred or left-aligned at the top of the content area.
- **Alternative (our current):**
  - Left: “Welcome to” + app name (e.g. “∞ together”).
  - Right: Search, notifications, profile (avatar + name + handle), primary CTA (e.g. “Focus Room”).

So the header can be either:
- **Title-only:** One big “Dashboard” (or current page name).
- **Utility bar:** Welcome + search + notifications + profile + CTA.

### 4.3 Main board (content area)

- **Placement:** Below the header, fills remaining height; scrolls when content overflows.
- **Background:** Slightly off-white (e.g. `bg-neutral-50`) to separate from header.
- **Padding:** Consistent (e.g. `p-4 md:p-6`).

### 4.4 Content layout (inside main board)

The reference uses a **two-column** content layout:

- **Left column (wider):**
  - **Welcome card:** Greeting, short message, CTAs, optional avatar. Rounded, accent background (e.g. orange/amber).
  - **Stats row:** 4 small cards in a row (e.g. “4 Teams”, “45 Users”, …). Rounded, light background.
  - **Team executive (or similar):** Large card with chart + legend. Rounded.

- **Right column (narrower):**
  - **“My activity”** (or similar): One tall card with subsections (e.g. “Upcoming talks”, “Upcoming meetings”, “Latest shoutouts”). Each subsection has a “View all” and list items. Rounded.

**Design rules for content:**

- All cards/sections use **consistent border-radius** (e.g. `rounded-xl`).
- Clear spacing between sections (e.g. `gap-6`).
- Responsive: columns stack on small screens.

---

## 5. Z-index and overlap

- **Background:** base (no z-index or 0).
- **Sidebar:** e.g. `z-0` (or 1) – full height, no radius.
- **Main panel:** e.g. `z-10` – rounded, shadowed, overlaps sidebar by a small amount (e.g. 12px) so the “card” reads clearly on top.

---

## 6. Checklist vs reference

| Item | Reference | Our implementation |
|------|-----------|--------------------|
| 3 elements only (sidebar, header, main board) | ✓ | ✓ GuideLayout |
| Background colour (warm / neutral) | Warm brown | `bg-neutral-200` (can switch to warm) |
| Sidebar full height, flush left | ✓ | ✓ No left padding |
| Sidebar below main (z-index) | ✓ | ✓ `z-0` sidebar, `z-10` main |
| Main panel rounded + shadow | ✓ | ✓ `rounded-xl shadow-lg` |
| Main overlaps sidebar | ✓ | ✓ `-ml-3` |
| Header inside main panel, rounded top | ✓ | ✓ `rounded-t-xl` on header |
| Page title in main content | “Dashboard” at top | Optional: add big title in MainBoard or header |
| Sidebar: brand, nav, user, theme | ✓ | We have brand, nav, ranking/reward; can add user + theme |
| Main content: cards with radius | ✓ | Dashboard uses `Card`; can add welcome + stats + activity layout |

---

## 7. Optional tweaks to match reference

1. **Background:** Use a warm brown (e.g. `bg-amber-900/30` or a custom `#8B7355`) instead of `neutral-200` if desired.
2. **Header:** Offer a variant that shows only a large “Dashboard” (or current page) title at the top of the main panel.
3. **Sidebar:** Add a compact user block (avatar + name + “Active”) and a Light/Dark toggle at the bottom.
4. **Dashboard page:** Structure content into:
   - Welcome card (accent colour).
   - Row of 4 stat cards.
   - Left: e.g. “Team executive” (or study stats) card; Right: “My activity” (or “Next lessons” / “Recent”) card.

This document can be used to implement or refine the layout and to keep the “3 elements only” rule and layering consistent.
