import { useEffect, useMemo, useState } from 'react'
import {
  AiBotIcon,
  AttachIcon,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  ChatInputBar,
  CloseIcon,
  DocumentIcon,
  MenuIcon,
  Modal,
  Input,
  Progress,
  Select,
  Textarea,
} from '../components/common'
import { useTheme } from '../contexts/ThemeContext'
import { semantic } from '../theme/colors'
import { textColorOn, cssColorToHex, getHueFamily, HUE_FAMILY_ORDER, hexToHsl } from '../utils/colorUtils'

/* ─── Types ─── */
type ColorItem = { id: string; name: string; hex: string }

/* ─── Helpers ─── */
function normalizeHexForKey(hex: string): string {
  const h = hex.replace(/^#/, '').trim().toLowerCase()
  return h.length === 3 ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2] : h
}

/* ─── Palette data (only neutrals + semantic kept) ─── */
const NEUTRALS: { name: string; hex: string }[] = [
  { name: 'neutral-50', hex: '#fafafa' }, { name: 'neutral-100', hex: '#ececec' },
  { name: 'neutral-200', hex: '#d4d4d4' }, { name: 'neutral-300', hex: '#a3a3a3' },
  { name: 'neutral-400', hex: '#a3a3a3' }, { name: 'neutral-500', hex: '#737373' },
  { name: 'neutral-600', hex: '#525252' }, { name: 'neutral-700', hex: '#404040' },
  { name: 'neutral-800', hex: '#262626' }, { name: 'neutral-900', hex: '#171717' },
]

const SYSTEM_GREYS: { name: string; hex: string }[] = [
  { name: 'Pale Grey', hex: '#F4F6F9' },
  { name: 'Neutral Grey', hex: '#F8F8F9' },
  { name: 'Hover Grey', hex: '#F4F3FF' },
]

const ALERT_COLORS: { name: string; hex: string }[] = [
  { name: 'Static Blue', hex: '#5B93FF' },
  { name: 'Heart Rythm', hex: '#FF5555' },
  { name: 'Successful', hex: '#51CC56' },
]

function getUnifiedColorsByFamily(): Map<string, ColorItem[]> {
  const flat: ColorItem[] = []
  const seenHex = new Set<string>()
  const add = (name: string, hex: string) => {
    const key = normalizeHexForKey(hex)
    if (seenHex.has(key)) return
    seenHex.add(key)
    flat.push({ id: `${name}-${key}`, name, hex: hex.startsWith('#') ? hex : `#${hex}` })
  }
  Object.entries(semantic).forEach(([name, hex]) => add(name, hex))
  NEUTRALS.forEach(({ name, hex }) => add(name, hex))
  SYSTEM_GREYS.forEach(({ name, hex }) => add(name, hex))
  ALERT_COLORS.forEach(({ name, hex }) => add(name, hex))

  const byFamily = new Map<string, ColorItem[]>()
  for (const family of HUE_FAMILY_ORDER) byFamily.set(family, [])
  for (const item of flat) {
    const family = getHueFamily(item.hex)
    const list = byFamily.get(family) ?? []
    list.push(item)
    byFamily.set(family, list)
  }
  byFamily.forEach((list) => {
    list.sort((a, b) => {
      const lA = hexToHsl(a.hex)?.l ?? 0
      const lB = hexToHsl(b.hex)?.l ?? 0
      return lB - lA
    })
  })
  return byFamily
}

const THEME_COLOR_TOKEN_NAMES = [
  'neutral-50', 'neutral-100', 'neutral-200', 'neutral-300', 'neutral-400',
  'neutral-500', 'neutral-600', 'neutral-700', 'neutral-800', 'neutral-900',
  'dark', 'cream', 'slate', 'green', 'amber',
  'ink', 'indigo-deep', 'violet-mid', 'lavender', 'indigo',
  'surface-light', 'pink-light', 'violet', 'blue', 'blue-deep',
  'surface-alt', 'gray-light', 'surface-muted', 'indigo-mid', 'violet-deep',
  'primary', 'primary-hover', 'primary-foreground', 'accent', 'accent-muted',
  'surface', 'background', 'highlight', 'highlight-hover', 'focus-area',
  'success', 'warning', 'error', 'border', 'border-strong',
] as const

const GRADIENT_NAMES = [
  'gradient-brand', 'gradient-atlitude-1', 'gradient-atlitude-2', 'gradient-atlitude-3', 'gradient-atlitude-4',
  'gradient-mindful-01', 'gradient-mindful-02', 'gradient-mindful-03', 'gradient-mindful-04', 'gradient-mindful-05',
] as const

const SECTIONS = [
  'logo-brandmarks', 'typography', 'colors-tokens', 'elevation', 'grid', 'spacing',
  'icons', 'buttons', 'controls', 'inputs', 'errors-search', 'navigation',
  'table', 'sidebar', 'upload-view', 'dialog-popup', 'chat-messages', 'quiz-popup',
  'cards', 'badges', 'progress', 'breadcrumbs', 'modals', 'chat-input', 'dividers-links',
] as const

/* ─── Small sub-components ─── */
function ColorSwatch({ hex, name }: { hex: string; name: string }) {
  const tc = textColorOn(hex)
  return (
    <div className="flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-600 p-2 min-w-0" style={{ backgroundColor: hex }}>
      <span className={`text-xs font-mono font-semibold shrink-0 ${tc === 'white' ? 'text-white' : 'text-neutral-900'}`}>{hex}</span>
      <span className={`text-xs truncate flex-1 min-w-0 ${tc === 'white' ? 'text-white/95' : 'text-neutral-700'}`}>{name}</span>
      <button type="button" onClick={(e) => { e.stopPropagation(); void navigator.clipboard.writeText(hex) }}
        className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded border ${tc === 'white' ? 'border-white/50 text-white hover:bg-white/20' : 'border-neutral-400 text-neutral-700 hover:bg-neutral-200'}`}
        title="Copy hex">Copy</button>
    </div>
  )
}

function SectionHeading({ id, title, description }: { id: string; title: string; description?: string }) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">{title}</h2>
      {description && <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{description}</p>}
    </section>
  )
}

/* ─── Main Page ─── */
export default function DebugComponents() {
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [chatDialogOpen, setChatDialogOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [chatValue, setChatValue] = useState('')
  const { theme } = useTheme()
  const [themeTokenValues, setThemeTokenValues] = useState<Record<string, string>>({})

  useEffect(() => {
    const root = document.documentElement
    const style = getComputedStyle(root)
    const next: Record<string, string> = {}
    THEME_COLOR_TOKEN_NAMES.forEach((name) => {
      const value = style.getPropertyValue(`--color-${name}`).trim()
      if (value) next[name] = value
    })
    setThemeTokenValues(next)
  }, [theme])

  const copyTokenHex = (value: string) => {
    const hex = cssColorToHex(value)
    void navigator.clipboard.writeText(hex ?? value)
  }

  const unifiedByFamily = useMemo(() => getUnifiedColorsByFamily(), [])

  const sectionLabel = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="min-h-screen bg-background w-full p-6 md:p-8">
      <div className="w-full max-w-[100%] space-y-12">
        {/* ─── Header & Nav ─── */}
        <header className="pb-6 border-b border-border">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">EOS Design System — Debug</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Full component library and design token reference.</p>
          <nav className="flex flex-wrap gap-2 mt-4">
            {SECTIONS.map((id) => (
              <a key={id} href={`#${id}`} className="text-xs font-medium text-primary underline hover:no-underline">{sectionLabel(id)}</a>
            ))}
          </nav>
        </header>

        {/* ════════════════════════════════════════════════════════════
            1. LOGO & BRANDMARKS
        ════════════════════════════════════════════════════════════ */}
        <section id="logo-brandmarks" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Logo & Brandmarks" description="Single brandmarks, logo variants, and app icon sizes from the EOS design system." />
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Single Brandmarks</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
              {['Motivation', 'Unity', 'Activity', 'Strength', 'Health', 'Rising', 'Harmony', 'Interaction', 'Healing'].map((name) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 flex items-center justify-center">
                    <span className="text-2xl text-primary">&#10038;</span>
                  </div>
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{name}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Logo</h3>
            <div className="flex flex-wrap gap-6 items-center">
              <span className="text-2xl font-bold text-primary tracking-tight">eos</span>
              <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">eos</span>
              <span className="text-2xl font-bold text-gradient-brand tracking-tight">eos</span>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">App Icon Sizes</h3>
            <div className="flex flex-wrap gap-6 items-end">
              {[{ size: 20, label: 'Notifications' }, { size: 30, label: 'Settings' }, { size: 40, label: 'Spotlight' }, { size: 60, label: 'Default' }, { size: 84, label: 'Large' }].map(({ size, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center" style={{ width: size, height: size }}>
                    <span className="text-primary" style={{ fontSize: size * 0.4 }}>&#10038;</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">{size}px</span>
                  <span className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            2. TYPOGRAPHY
        ════════════════════════════════════════════════════════════ */}
        <section id="typography" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Typography" description="Font family: Aeonik. 8pt baseline grid. Type scale with specs." />
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-6">Titles & Headlines</h3>
            <div className="space-y-6">
              {([
                { label: 'Title H1', size: '72px', weight: 'Bold', lh: '100%', ls: '-2%', className: 'text-[72px] font-bold leading-none tracking-tighter' },
                { label: 'Headline H2', size: '56px', weight: 'Bold', lh: '100%', ls: '-2%', className: 'text-[56px] font-bold leading-none tracking-tighter' },
                { label: 'Headline H3', size: '48px', weight: 'Bold', lh: '100%', ls: '0', className: 'text-[48px] font-bold leading-none' },
                { label: 'Headline H4', size: '32px', weight: 'Bold', lh: '100%', ls: '0', className: 'text-[32px] font-bold leading-none' },
                { label: 'Headline H5', size: '32px', weight: 'Medium', lh: '100%', ls: '0', className: 'text-[32px] font-medium leading-none' },
              ] as const).map((item) => (
                <div key={item.label} className="flex items-baseline gap-6 pb-4 border-b border-neutral-100 dark:border-neutral-700 last:border-0">
                  <div className="shrink-0 w-28">
                    <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400">{item.label}</p>
                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">Size: {item.size}<br/>Weight: {item.weight}<br/>LH: {item.lh}<br/>LS: {item.ls}</p>
                  </div>
                  <p className={`text-neutral-900 dark:text-neutral-100 ${item.className}`}>Cardiac Rehab</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-6">Paragraphs & Body</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400">Pre-title</p>
                {(['Bold', 'Medium', 'Regular', 'Light'] as const).map((w) => (
                  <div key={w} className="flex items-center gap-4">
                    <span className="text-[10px] text-neutral-400 w-14 shrink-0">14px {w}</span>
                    <p className={`text-sm text-neutral-900 dark:text-neutral-100 ${w === 'Bold' ? 'font-bold' : w === 'Medium' ? 'font-medium' : w === 'Light' ? 'font-light' : 'font-normal'}`}>Cardiac Rehab</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400">Subtitle</p>
                {(['Bold', 'Medium', 'Regular'] as const).map((w) => (
                  <div key={w} className="flex items-center gap-4">
                    <span className="text-[10px] text-neutral-400 w-14 shrink-0">24px {w}</span>
                    <p className={`text-2xl text-neutral-900 dark:text-neutral-100 ${w === 'Bold' ? 'font-bold' : w === 'Medium' ? 'font-medium' : 'font-normal'}`}>Cardiac Rehab</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400">Body text</p>
                {(['Bold', 'Medium', 'Regular'] as const).map((w) => (
                  <div key={w} className="flex items-center gap-4">
                    <span className="text-[10px] text-neutral-400 w-14 shrink-0">12px {w}</span>
                    <p className={`text-xs text-neutral-900 dark:text-neutral-100 ${w === 'Bold' ? 'font-bold' : w === 'Medium' ? 'font-medium' : 'font-normal'}`}>Cardiac Rehab</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400">Small text</p>
                {(['Bold', 'Medium', 'Regular'] as const).map((w) => (
                  <div key={w} className="flex items-center gap-4">
                    <span className="text-[10px] text-neutral-400 w-14 shrink-0">11px {w}</span>
                    <p className={`text-[11px] text-neutral-900 dark:text-neutral-100 ${w === 'Bold' ? 'font-bold' : w === 'Medium' ? 'font-medium' : 'font-normal'}`}>Cardiac Rehab</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Text Styles</h3>
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Button text', className: 'text-sm font-medium uppercase tracking-wide' },
                { label: 'Caption', className: 'text-[10px] text-neutral-500 dark:text-neutral-400' },
                { label: 'Label (study)', className: 'label-study' },
                { label: 'Link', className: 'text-sm text-primary underline' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="text-[10px] text-neutral-400">{s.label}</span>
                  <p className={`text-neutral-900 dark:text-neutral-100 ${s.className}`}>Sample</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            3. COLORS & THEME TOKENS
        ════════════════════════════════════════════════════════════ */}
        <section id="colors-tokens" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Colors & Theme Tokens" description="Theme tokens with resolved hex (light/dark), system greys, alert colors, palette swatches, and gradient previews." />

          {/* Theme tokens */}
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-3">Theme Tokens</h3>
            <div className="flex flex-wrap gap-3">
              {THEME_COLOR_TOKEN_NAMES.map((name) => {
                const value = themeTokenValues[name]
                const hex = value ? cssColorToHex(value) : null
                const displayValue = hex ?? value ?? '—'
                return (
                  <div key={name} className="flex items-center gap-2 p-2 rounded-lg border border-border dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800">
                    <span className="w-10 h-10 rounded-lg border border-neutral-300 dark:border-neutral-600 shrink-0" style={value ? { backgroundColor: value } : undefined} title={value ?? name} />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-neutral-900 dark:text-neutral-200 truncate">{name}</p>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono truncate" title={displayValue}>{displayValue}</p>
                    </div>
                    <button type="button" onClick={() => value && copyTokenHex(value)} disabled={!value}
                      className="shrink-0 text-xs font-medium px-2 py-1 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors disabled:opacity-50"
                      title="Copy hex">Copy</button>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* System greys & alert colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-3">System Greys</h3>
              <div className="grid grid-cols-3 gap-3">
                {SYSTEM_GREYS.map((c) => <ColorSwatch key={c.name} hex={c.hex} name={c.name} />)}
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-3">Alerts & Notifications</h3>
              <div className="grid grid-cols-3 gap-3">
                {ALERT_COLORS.map((c) => <ColorSwatch key={c.name} hex={c.hex} name={c.name} />)}
              </div>
            </Card>
          </div>

          {/* All colors by hue family */}
          <Card className="w-full">
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-3">All Colors by Hue</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {HUE_FAMILY_ORDER.map((family) => {
                const raw = unifiedByFamily.get(family) ?? []
                const items = family === 'neutral' ? raw.slice(0, 18) : raw
                if (items.length === 0) return null
                const label = family.charAt(0).toUpperCase() + family.slice(1)
                return (
                  <span key={family} className="contents">
                    <div className="col-span-full flex items-center gap-2 mt-4 mb-1 first:mt-0 pt-2 first:pt-0 border-t border-border first:border-t-0">
                      <span className="text-xs font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">{label}</span>
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500">({items.length})</span>
                    </div>
                    {items.map((item) => <ColorSwatch key={item.id} hex={item.hex} name={item.name} />)}
                  </span>
                )
              })}
            </div>
          </Card>

          {/* Gradient previews */}
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-3">Gradients (oklch interpolation)</h3>
            <div className="space-y-3">
              {GRADIENT_NAMES.map((name) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="h-10 flex-1 rounded-lg border border-neutral-200 dark:border-neutral-600" style={{ background: `var(--${name})` }} />
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0 w-40 truncate">{name}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-32 h-10 rounded-lg bg-gradient-brand" />
                <span className="text-lg font-bold text-gradient-brand">Brand text gradient</span>
              </div>
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            4. ELEVATION
        ════════════════════════════════════════════════════════════ */}
        <section id="elevation" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Elevation" description="Shadow depth levels: Default, Active, and Floating." />
          <Card>
            <div className="flex flex-wrap gap-8 justify-center py-4">
              {([
                { label: 'Default', shadow: 'shadow-none border border-neutral-200 dark:border-neutral-600' },
                { label: 'Active', shadow: 'shadow-md border border-neutral-200 dark:border-neutral-600' },
                { label: 'Floating', shadow: 'shadow-xl border border-neutral-200 dark:border-neutral-600' },
              ] as const).map((e) => (
                <div key={e.label} className={`w-40 h-28 rounded-xl bg-white dark:bg-neutral-800 flex items-center justify-center ${e.shadow}`}>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{e.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            5. GRID SYSTEM
        ════════════════════════════════════════════════════════════ */}
        <section id="grid" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Grid System" description="12 columns, 80px width, 30px gutter, 100px margin. Canvas: 1440 x 960px." />
          <Card>
            <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              <span>12C</span><span>80W</span><span>30G</span><span>100M</span><span className="ml-auto">1440 x 960px</span>
            </div>
            <div className="grid grid-cols-12 gap-[6px] h-48 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 p-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-primary/10 dark:bg-primary/20 rounded-sm h-full" />
              ))}
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            6. SPACING SYSTEM
        ════════════════════════════════════════════════════════════ */}
        <section id="spacing" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Spacing System" description="8pt linear scale for elements, 4pt for icons and small text blocks." />
          <Card>
            <div className="space-y-3">
              {[4, 8, 12, 16, 24, 32, 40].map((px) => (
                <div key={px} className="flex items-center gap-4">
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 w-10 text-right">{px}</span>
                  <div className="h-4 rounded-sm bg-primary/30 dark:bg-primary/40" style={{ width: px * 4 }} />
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            7. ICONS
        ════════════════════════════════════════════════════════════ */}
        <section id="icons" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Icons" description="Vuesax Linear. Available sizes: 16px, 20px, 24px." />
          <Card>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {([
                { Icon: AiBotIcon, name: 'AiBotIcon' },
                { Icon: CloseIcon, name: 'CloseIcon' },
                { Icon: AttachIcon, name: 'AttachIcon' },
                { Icon: MenuIcon, name: 'MenuIcon' },
                { Icon: DocumentIcon, name: 'DocumentIcon' },
              ] as const).map(({ Icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-3 p-3 rounded-lg border border-border dark:border-neutral-600">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                    <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                    <Icon className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                  </div>
                  <div className="flex gap-3 text-[10px] text-neutral-400">
                    <span>16</span><span>20</span><span>24</span>
                  </div>
                  <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">{name}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            8. BUTTONS
        ════════════════════════════════════════════════════════════ */}
        <section id="buttons" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Buttons" description="48px height, 30px h-padding, 1.5px stroke (outlined). Full matrix: Default / With icon / Icon only." />

          {/* Default buttons */}
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Default</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="pr-4 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 w-24" />
                    <th className="px-4 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">Contained</th>
                    <th className="px-4 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">Outlined</th>
                    <th className="px-4 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">Texted</th>
                    <th className="px-4 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">Split</th>
                  </tr>
                </thead>
                <tbody>
                  {(['Enabled', 'Disabled', 'Hover', 'Pressed', 'Processing'] as const).map((state) => (
                    <tr key={state} className="border-t border-neutral-100 dark:border-neutral-700">
                      <td className="pr-4 py-3 text-xs font-medium text-neutral-500 dark:text-neutral-400">{state}</td>
                      <td className="px-4 py-3">
                        <button type="button" disabled={state === 'Disabled'} className={`px-[30px] h-12 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors ${state === 'Disabled' ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed' : state === 'Pressed' ? 'bg-primary-hover text-primary-foreground' : 'bg-primary text-primary-foreground hover:bg-primary-hover'}`}>
                          {state === 'Processing' ? '⟳ Processing' : state}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button type="button" disabled={state === 'Disabled'} className={`px-[30px] h-12 rounded-lg text-sm font-medium uppercase tracking-wide border-[1.5px] transition-colors ${state === 'Disabled' ? 'border-neutral-300 dark:border-neutral-600 text-neutral-400 dark:text-neutral-500 cursor-not-allowed' : state === 'Pressed' ? 'border-primary-hover text-primary-hover bg-primary/10' : 'border-primary text-primary hover:bg-primary/10'}`}>
                          {state === 'Processing' ? '⟳ Processing' : state}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button type="button" disabled={state === 'Disabled'} className={`px-[30px] h-12 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors ${state === 'Disabled' ? 'text-neutral-400 dark:text-neutral-500 cursor-not-allowed' : state === 'Pressed' ? 'text-primary-hover bg-primary/10' : 'text-primary hover:bg-primary/10'}`}>
                          {state === 'Processing' ? '⟳ Processing' : state}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="inline-flex rounded-lg overflow-hidden">
                          <button type="button" disabled={state === 'Disabled'} className={`px-4 h-12 text-sm font-medium uppercase tracking-wide transition-colors ${state === 'Disabled' ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-primary-hover'}`}>
                            {state === 'Processing' ? '⟳' : state}
                          </button>
                          <button type="button" disabled={state === 'Disabled'} className={`px-2 h-12 text-sm border-l border-white/30 transition-colors ${state === 'Disabled' ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-primary-hover'}`}>
                            ▾
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* With icon */}
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">With Icon</h3>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="inline-flex items-center gap-2 px-[24px] h-12 rounded-lg bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wide"><span>+</span> Enabled</button>
              <button type="button" className="inline-flex items-center gap-2 px-[24px] h-12 rounded-lg border-[1.5px] border-primary text-primary font-medium text-sm uppercase tracking-wide"><span>+</span> Outlined</button>
              <button type="button" className="inline-flex items-center gap-2 px-[24px] h-12 rounded-lg text-primary font-medium text-sm uppercase tracking-wide hover:bg-primary/10"><span>+</span> Texted</button>
              <button type="button" disabled className="inline-flex items-center gap-2 px-[24px] h-12 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 font-medium text-sm uppercase tracking-wide cursor-not-allowed"><span>+</span> Disabled</button>
            </div>
          </Card>

          {/* Icon only */}
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Icon Only</h3>
            <div className="flex flex-wrap gap-3 items-center">
              <button type="button" className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-lg">+</button>
              <button type="button" className="w-12 h-12 rounded-lg border-[1.5px] border-primary text-primary flex items-center justify-center text-lg">+</button>
              <button type="button" className="w-12 h-12 rounded-lg text-primary flex items-center justify-center text-lg hover:bg-primary/10">+</button>
              <button type="button" disabled className="w-12 h-12 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 flex items-center justify-center text-lg cursor-not-allowed">+</button>
            </div>
          </Card>

          {/* App Button component variants */}
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">App Button Component</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">Variants</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">Disabled</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" disabled>Primary</Button>
                  <Button variant="secondary" disabled>Secondary</Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            9. CONTROLS
        ════════════════════════════════════════════════════════════ */}
        <section id="controls" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Controls" description="Checkbox, Radio, Switch, and Chips." />
          <Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* Checkbox */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">Checkbox</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-neutral-900 dark:text-neutral-100">
                    <span className="w-5 h-5 rounded border-2 border-border dark:border-neutral-500" />Unselected</label>
                  <label className="flex items-center gap-2 text-sm text-neutral-900 dark:text-neutral-100">
                    <span className="w-5 h-5 rounded border-2 border-primary bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">✓</span>Selected</label>
                  <label className="flex items-center gap-2 text-sm text-neutral-900 dark:text-neutral-100">
                    <span className="w-5 h-5 rounded border-2 border-primary bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">—</span>Indeterminate</label>
                  <label className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500">
                    <span className="w-5 h-5 rounded border-2 border-neutral-300 dark:border-neutral-600 opacity-50" />Inactive Unselected</label>
                  <label className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500">
                    <span className="w-5 h-5 rounded border-2 border-primary/50 bg-primary/50 flex items-center justify-center text-primary-foreground/50 text-xs font-bold">✓</span>Inactive Selected</label>
                  <label className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500">
                    <span className="w-5 h-5 rounded border-2 border-primary/50 bg-primary/50 flex items-center justify-center text-primary-foreground/50 text-xs font-bold">—</span>Inactive Indeterminate</label>
                </div>
              </div>
              {/* Radio */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">Radio button</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-neutral-900 dark:text-neutral-100">
                    <span className="w-5 h-5 rounded-full border-2 border-border dark:border-neutral-500" />Unselected</label>
                  <label className="flex items-center gap-2 text-sm text-neutral-900 dark:text-neutral-100">
                    <span className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center"><span className="w-2.5 h-2.5 rounded-full bg-primary" /></span>Selected</label>
                  <label className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500">
                    <span className="w-5 h-5 rounded-full border-2 border-neutral-300 dark:border-neutral-600 opacity-50" />Inactive Unselected</label>
                  <label className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500">
                    <span className="w-5 h-5 rounded-full border-2 border-primary/50 flex items-center justify-center"><span className="w-2.5 h-2.5 rounded-full bg-primary/50" /></span>Inactive Selected</label>
                </div>
              </div>
              {/* Switch */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">Switch</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-neutral-900 dark:text-neutral-100">
                    <span className="w-10 h-6 rounded-full bg-neutral-300 dark:bg-neutral-600 flex items-center pl-1"><span className="w-4 h-4 rounded-full bg-white" /></span>Inactive</label>
                  <label className="flex items-center gap-2 text-sm text-neutral-900 dark:text-neutral-100">
                    <span className="w-10 h-6 rounded-full bg-primary flex items-center justify-end pr-1"><span className="w-4 h-4 rounded-full bg-white" /></span>Active</label>
                  <label className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500">
                    <span className="w-10 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center pl-1 opacity-50"><span className="w-4 h-4 rounded-full bg-white" /></span>Inactive Disabled</label>
                  <label className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500">
                    <span className="w-10 h-6 rounded-full bg-primary/50 flex items-center justify-end pr-1 opacity-50"><span className="w-4 h-4 rounded-full bg-white" /></span>Active Disabled</label>
                </div>
              </div>
              {/* Chips */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">Chips</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-medium">Primary <span>×</span></span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-success/15 text-success text-xs font-medium">Success <span>×</span></span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-error/15 text-error text-xs font-medium">Error <span>×</span></span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-warning/15 text-warning text-xs font-medium">Warning <span>×</span></span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-400 text-xs font-medium">Disabled <span>×</span></span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            10. INPUT FIELDS
        ════════════════════════════════════════════════════════════ */}
        <section id="inputs" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Input Fields" description="56px height, 16px padding. 4 types x 5 states." />
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="pr-4 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 text-left w-24" />
                    <th className="px-2 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 text-left">Textarea</th>
                    <th className="px-2 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 text-left">Text field</th>
                    <th className="px-2 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 text-left">Select</th>
                    <th className="px-2 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 text-left">Multi-select</th>
                  </tr>
                </thead>
                <tbody>
                  {(['Static', 'Filled', 'Disabled', 'Hover', 'Active'] as const).map((state) => (
                    <tr key={state} className="border-t border-neutral-100 dark:border-neutral-700 align-top">
                      <td className="pr-4 py-3 text-xs font-medium text-neutral-500 dark:text-neutral-400">{state}</td>
                      <td className="px-2 py-3">
                        <div className="space-y-1">
                          <span className="text-[10px] text-neutral-500 dark:text-neutral-400">Label{state === 'Static' ? '*' : ''}</span>
                          <textarea disabled={state === 'Disabled'} placeholder="Placeholder" defaultValue={state === 'Filled' ? 'Placeholder' : undefined}
                            className={`w-full min-h-[56px] px-4 py-3 text-sm rounded-lg border bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 resize-y
                              ${state === 'Disabled' ? 'opacity-50 bg-neutral-100 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600' : state === 'Active' ? 'border-primary ring-2 ring-primary/30' : state === 'Hover' ? 'border-neutral-400 dark:border-neutral-500' : 'border-neutral-200 dark:border-neutral-600'}`} />
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="space-y-1">
                          <span className="text-[10px] text-neutral-500 dark:text-neutral-400">Label</span>
                          <input type="text" disabled={state === 'Disabled'} placeholder="Placeholder" defaultValue={state === 'Filled' ? 'Placeholder' : undefined}
                            className={`w-full h-14 px-4 text-sm rounded-lg border bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400
                              ${state === 'Disabled' ? 'opacity-50 bg-neutral-100 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600' : state === 'Active' ? 'border-primary ring-2 ring-primary/30' : state === 'Hover' ? 'border-neutral-400 dark:border-neutral-500' : 'border-neutral-200 dark:border-neutral-600'}`} />
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="space-y-1">
                          <span className="text-[10px] text-neutral-500 dark:text-neutral-400">Label</span>
                          <div className={`relative w-full h-14 rounded-lg border bg-white dark:bg-neutral-800
                            ${state === 'Disabled' ? 'opacity-50 bg-neutral-100 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600' : state === 'Active' ? 'border-primary ring-2 ring-primary/30' : state === 'Hover' ? 'border-neutral-400 dark:border-neutral-500' : 'border-neutral-200 dark:border-neutral-600'}`}>
                            <select disabled={state === 'Disabled'} className="w-full h-full px-4 pr-8 bg-transparent text-sm text-neutral-900 dark:text-neutral-100 appearance-none">
                              <option>Placeholder</option>
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">▾</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="space-y-1">
                          <span className="text-[10px] text-neutral-500 dark:text-neutral-400">Label</span>
                          <div className={`w-full min-h-[56px] px-4 py-3 rounded-lg border bg-white dark:bg-neutral-800 flex flex-wrap gap-1 items-center
                            ${state === 'Disabled' ? 'opacity-50 bg-neutral-100 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600' : state === 'Active' ? 'border-primary ring-2 ring-primary/30' : state === 'Hover' ? 'border-neutral-400 dark:border-neutral-500' : 'border-neutral-200 dark:border-neutral-600'}`}>
                            {state === 'Filled' ? (
                              <>
                                {['Item', 'Item', 'Item'].map((t, i) => (
                                  <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary text-primary-foreground text-xs">{t} <span>×</span></span>
                                ))}
                              </>
                            ) : (
                              <span className="text-sm text-neutral-500 dark:text-neutral-400">Placeholder</span>
                            )}
                            <span className="ml-auto text-neutral-500">▾</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* App Input/Select/Textarea components */}
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">App Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <Input placeholder="Placeholder only" />
                <Input label="With label" placeholder="Placeholder" />
                <Input label="With error" error="This field is required." defaultValue="invalid" />
                <Input label="Disabled" disabled placeholder="Disabled" />
              </div>
              <div className="space-y-4">
                <Select label="Select option" options={[{ value: '', label: 'Choose…' }, { value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }]} />
                <Select label="With error" options={[{ value: 'x', label: 'One' }]} error="Please select a value." />
              </div>
              <div className="space-y-4">
                <Textarea placeholder="Placeholder only" />
                <Textarea label="With label" placeholder="Enter description" />
                <Textarea label="With error" error="Description is required." />
              </div>
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            11. ERROR & SEARCH
        ════════════════════════════════════════════════════════════ */}
        <section id="errors-search" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Error & Search" description="Error states for inputs. Search bar variants. Status messages." />
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Error States</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400">Label*</span>
                <input type="text" defaultValue="Placeholder" className="w-full h-14 px-4 text-sm rounded-lg border-2 border-error bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100" />
                <p className="text-xs text-error flex items-center gap-1"><span className="text-error">●</span> This is a message</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400">Label</span>
                <div className="relative">
                  <input type="text" defaultValue="Placeholder" className="w-full h-14 px-4 pr-10 text-sm rounded-lg border-2 border-error bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-error text-white flex items-center justify-center text-xs">!</span>
                </div>
                <p className="text-xs text-error flex items-center gap-1"><span>●</span> This is a message</p>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Search bar & Message</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">⌕</span>
                  <input type="search" placeholder="Search" className="w-full pl-9 pr-8 h-12 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 text-sm" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer">×</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">⌕</span>
                  <input type="search" placeholder="Search" defaultValue="Search" className="w-full pl-9 pr-8 h-12 rounded-lg border-2 border-primary bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer">×</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">⌕</span>
                  <input type="search" placeholder="Search" className="w-full pl-9 pr-8 h-12 rounded-lg border-2 border-error bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 text-sm" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-error text-white flex items-center justify-center text-xs">!</span>
                </div>
                <div className="relative opacity-50">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">⌕</span>
                  <input type="search" disabled placeholder="Search" className="w-full pl-9 pr-8 h-12 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-700 text-neutral-400 text-sm cursor-not-allowed" />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">Status Messages</p>
                <div className="rounded-lg px-4 py-2.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neutral-400" /> Disable</div>
                <div className="rounded-lg px-4 py-2.5 bg-success/10 text-success text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success" /> Success</div>
                <div className="rounded-lg px-4 py-2.5 bg-error/10 text-error text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-error" /> Error</div>
                <div className="rounded-lg px-4 py-2.5 bg-warning/10 text-warning text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-warning" /> Warning</div>
              </div>
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            12. NAVIGATION
        ════════════════════════════════════════════════════════════ */}
        <section id="navigation" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Navigation" description="Pagination, Slider, Navigation buttons, Tabbar, and Header." />
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Pagination */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">Pagination</p>
                <div className="space-y-3">
                  {[false, true].map((filled, vi) => (
                    <div key={vi} className="flex items-center gap-1">
                      <button type="button" className="w-8 h-8 rounded text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-sm">‹</button>
                      <button type="button" className={`w-8 h-8 rounded text-sm font-medium ${filled ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-primary text-primary-foreground'}`}>1</button>
                      {[2, 3].map((n) => <button key={n} type="button" className="w-8 h-8 rounded text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">{n}</button>)}
                      <span className="text-neutral-400 text-sm px-1">…</span>
                      {[94, 95, 96].map((n) => <button key={n} type="button" className="w-8 h-8 rounded text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">{n}</button>)}
                      <button type="button" className="w-8 h-8 rounded text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-sm">›</button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Slider */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">Slider</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <button type="button" className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 flex items-center justify-center">‹</button>
                    <button type="button" className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">›</button>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-8 h-1 rounded-full bg-primary" />
                    <div className="w-8 h-1 rounded-full bg-primary" />
                    <div className="w-8 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                  </div>
                  <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">01 <span className="text-sm font-normal text-neutral-400">/ 03</span></p>
                </div>
              </div>
              {/* Nav buttons */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">Navigation buttons</p>
                <div className="flex items-center gap-4">
                  <button type="button" className="w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700">‹</button>
                  <button type="button" className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">›</button>
                </div>
              </div>
              {/* Tabbar */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">Tabbar</p>
                <div className="space-y-3">
                  <div className="inline-flex rounded-full border border-neutral-200 dark:border-neutral-600 p-1 gap-0">
                    <button type="button" className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/30">Selected Item</button>
                    {['Item', 'Item', 'Item'].map((t, i) => <button key={i} type="button" className="px-4 py-1.5 rounded-full text-neutral-600 dark:text-neutral-400 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700">{t}</button>)}
                  </div>
                  <div className="flex gap-2">
                    {['⊞', '⊟', '☰'].map((icon, i) => (
                      <button key={i} type="button" className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${i === 2 ? 'border-2 border-primary text-primary' : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}>{icon}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">Header</p>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Section title</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Subtitle</p>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">⌕</span>
                <input type="search" placeholder="Search..." className="pl-9 pr-4 h-10 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-sm text-neutral-900 dark:text-neutral-100 w-40" />
              </div>
              <button type="button" className="h-10 px-4 rounded-lg border border-neutral-200 dark:border-neutral-600 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex items-center gap-1.5">Filter ⊞</button>
              <button type="button" className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Action button</button>
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            13. TABLE SYSTEM
        ════════════════════════════════════════════════════════════ */}
        <section id="table" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Table System" description="Row items, column headings, and search filter." />
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Row Item</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="pr-4 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 text-left w-28" />
                    <th className="px-4 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 text-left">Default</th>
                    <th className="px-4 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 text-left">Hover</th>
                    <th className="px-4 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 text-left">Active</th>
                    <th className="px-4 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 text-left">Static-Selected</th>
                  </tr>
                </thead>
                <tbody>
                  {(['Selectable', 'Inselectable', 'Selectable-1', 'Selectable-2', 'Chip'] as const).map((row) => (
                    <tr key={row} className="border-t border-neutral-100 dark:border-neutral-700">
                      <td className="pr-4 py-3 text-xs font-medium text-neutral-500 dark:text-neutral-400">{row}</td>
                      {(['default', 'hover', 'active', 'selected'] as const).map((state) => (
                        <td key={state} className="px-4 py-3">
                          <div className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm
                            ${state === 'hover' ? 'bg-primary/5 border-primary/20' : state === 'active' ? 'bg-primary/10 border-primary/30' : state === 'selected' ? 'bg-primary/5 border-primary/20' : 'border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800'}`}>
                            {row !== 'Inselectable' && (
                              <span className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center text-[10px]
                                ${(state === 'active' || state === 'selected') ? 'border-primary bg-primary text-primary-foreground' : 'border-neutral-300 dark:border-neutral-500'}`}>
                                {(state === 'active' || state === 'selected') && '✓'}
                              </span>
                            )}
                            {(row === 'Selectable-1' || row === 'Selectable-2') && <span className="text-neutral-400">›</span>}
                            <span className="text-neutral-900 dark:text-neutral-100">Default</span>
                            {row === 'Chip' && <span className={`ml-auto px-2 py-0.5 rounded text-[10px] font-medium ${state === 'active' || state === 'selected' ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}>Primary</span>}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Column Heading</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-[10px] text-neutral-400">Selectable</p>
                  {['Default', 'Hover', 'Sorted'].map((s) => (
                    <div key={s} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${s === 'Hover' ? 'bg-primary/5' : 'bg-neutral-50 dark:bg-neutral-700'}`}>
                      <span className="w-4 h-4 rounded border-2 border-neutral-300 dark:border-neutral-500 shrink-0" />
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Label</span>
                      <span className="ml-auto text-neutral-400 text-xs">{s === 'Sorted' ? '↕' : '↕'}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-neutral-400">Inselectable</p>
                  {['Default', 'Hover', 'Sorted'].map((s) => (
                    <div key={s} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${s === 'Hover' ? 'bg-primary/5' : 'bg-neutral-50 dark:bg-neutral-700'}`}>
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Label</span>
                      <span className="ml-auto text-neutral-400 text-xs">{s === 'Sorted' ? '↕' : '↕'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Search Filter</h3>
              <div className="space-y-3 max-w-xs">
                <div className="flex items-center gap-2 h-10 px-3 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400 flex-1">Select</span>
                  <span className="text-neutral-400">▾</span>
                  <span className="w-7 h-7 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">▼</span>
                </div>
                <div className="flex items-center gap-2 h-10 px-3 rounded-lg border-2 border-primary bg-white dark:bg-neutral-800">
                  <span className="text-sm text-neutral-900 dark:text-neutral-100 flex-1">Select</span>
                  <span className="text-neutral-400">▾</span>
                  <span className="w-7 h-7 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs">▼</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            14. SIDEBAR
        ════════════════════════════════════════════════════════════ */}
        <section id="sidebar" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Sidebar" description="5 sidebar variants: expanded, compact, dark, collapsed, icon-only." />
          <Card>
            <div className="flex flex-wrap gap-4 items-start">
              {/* Expanded light */}
              <div className="w-56 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 overflow-hidden">
                <div className="px-4 py-3 flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-700">
                  <span className="text-primary text-lg">✦</span>
                  <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">eos</span>
                </div>
                <div className="p-3">
                  <div className="h-9 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center text-neutral-400 text-xs mb-3">⌕ Search</div>
                  {['Home', 'Calendar', 'Cardio Session', 'Vitals', 'Reporting'].map((item, i) => (
                    <div key={item} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${i === 4 ? 'bg-primary/10 text-primary font-medium' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}>
                      <span className="w-4 h-4 rounded bg-neutral-200 dark:bg-neutral-600 shrink-0" />
                      {item}
                      <span className="ml-auto text-neutral-400 text-xs">▾</span>
                    </div>
                  ))}
                </div>
                <div className="px-3 py-2 border-t border-neutral-100 dark:border-neutral-700 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-600" />
                  <div className="text-xs"><p className="font-medium text-neutral-900 dark:text-neutral-100">Dr. Easin Arafat</p><p className="text-neutral-400">Admin</p></div>
                </div>
              </div>

              {/* Dark with active */}
              <div className="w-56 rounded-xl border border-neutral-700 bg-neutral-900 overflow-hidden">
                <div className="px-4 py-3 flex items-center gap-2 border-b border-neutral-700">
                  <span className="text-primary text-lg">✦</span>
                  <span className="text-sm font-bold text-white">eos</span>
                </div>
                <div className="p-3">
                  <div className="h-9 px-3 rounded-lg bg-primary/20 flex items-center text-primary/60 text-xs mb-3">⌕ Search</div>
                  {['Home', 'Calendar', 'Cardio Session', 'Vitals', 'Reporting'].map((item, i) => (
                    <div key={item} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${i === 4 ? 'bg-primary text-primary-foreground font-medium' : 'text-neutral-300 hover:bg-neutral-800'}`}>
                      <span className="w-4 h-4 rounded bg-neutral-700 shrink-0" />
                      {item}
                      <span className="ml-auto text-neutral-500 text-xs">▾</span>
                    </div>
                  ))}
                </div>
                <div className="px-3 py-2 border-t border-neutral-700 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-700" />
                  <div className="text-xs"><p className="font-medium text-white">Dr. Easin Arafat</p><p className="text-neutral-500">Admin</p></div>
                </div>
              </div>

              {/* Icon only */}
              <div className="w-16 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 overflow-hidden flex flex-col items-center py-3 gap-3">
                <span className="text-primary text-lg">✦</span>
                <div className="h-px w-8 bg-neutral-200 dark:bg-neutral-600" />
                {['⌕', '⊞', '📅', '♥', '📊', '👤'].map((icon, i) => (
                  <div key={i} className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm ${i === 4 ? 'bg-primary/10 text-primary' : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}>{icon}</div>
                ))}
                <div className="mt-auto w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-600" />
              </div>
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            15. UPLOAD & VIEW
        ════════════════════════════════════════════════════════════ */}
        <section id="upload-view" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Upload & View" description="Drop area, uploading progress, uploaded file view." />
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Drop area */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">Drop area</p>
                <div className="flex flex-col items-center justify-center gap-2 p-8 rounded-xl border-2 border-dashed border-primary/40 dark:border-primary/30 bg-primary/5 dark:bg-primary/10 min-h-[160px]">
                  <span className="text-primary text-2xl">↑</span>
                  <p className="text-sm font-medium text-primary">Drop or drag file</p>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400">doc, pdf, xsl</p>
                  <p className="text-[10px] text-neutral-400">max size: 5mb</p>
                </div>
                <div className="mt-3 flex flex-col items-center justify-center gap-2 p-8 rounded-xl border-2 border-dashed border-error/40 bg-error/5 min-h-[120px]">
                  <p className="text-sm font-medium text-error">Wrong file format.</p>
                  <p className="text-sm text-error">Please try again</p>
                  <p className="text-[10px] text-neutral-400">doc, pdf, xsl &middot; max size: 5mb</p>
                </div>
              </div>
              {/* Uploading */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">Uploading progress</p>
                <div className="space-y-4">
                  <div className="rounded-lg border border-neutral-200 dark:border-neutral-600 p-3 bg-white dark:bg-neutral-800">
                    <p className="text-xs font-medium text-primary mb-1">Uploading...</p>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate flex-1">BS40-5BP_National_Insurance_Number-001</p>
                      <span className="text-[10px] text-neutral-400 shrink-0">120kb</span>
                      <button type="button" className="text-neutral-400 hover:text-neutral-600 text-xs">×</button>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-600 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-3/5" />
                    </div>
                  </div>
                  <div className="rounded-lg border border-neutral-200 dark:border-neutral-600 p-3 bg-white dark:bg-neutral-800">
                    <p className="text-xs font-medium text-primary mb-1">Uploading...</p>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 flex-1">3 of 76 files</p>
                      <span className="text-[10px] text-neutral-400 shrink-0">2 of 5mb</span>
                      <button type="button" className="text-neutral-400 hover:text-neutral-600 text-xs">×</button>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-600 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-2/5" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Uploaded files */}
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">Uploaded file view</p>
                <div className="space-y-3">
                  {[
                    { name: 'BS40-5BP_National_Insurance.doc', size: '120kb', color: 'bg-blue-500' },
                    { name: 'BS40-5BP_Patients_Management.2023.doc', size: '120kb', color: 'bg-green-500' },
                    { name: 'BS40-5BP_National_Insurance.doc', size: '120kb', color: 'bg-neutral-500' },
                  ].map((file, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-neutral-200 dark:border-neutral-600 p-3 bg-white dark:bg-neutral-800">
                      <div className={`w-10 h-10 rounded-lg ${file.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>DOC</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{file.name}</p>
                        <p className="text-[10px] text-neutral-400">{file.size}</p>
                      </div>
                      <button type="button" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 shrink-0">×</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            16. POPUP DIALOG
        ════════════════════════════════════════════════════════════ */}
        <section id="dialog-popup" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Popup Dialog" description="Modal component in various sizes and use cases." />
          <Card>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => setModalOpen(true)}>Info Dialog</Button>
              <Button variant="secondary" onClick={() => setConfirmModalOpen(true)}>Confirm Dialog</Button>
              <Button variant="secondary" onClick={() => setFormModalOpen(true)}>Form Dialog</Button>
            </div>
          </Card>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Information" size="max-w-md">
            <p className="text-neutral-700 dark:text-neutral-300">This is an informational dialog. It uses the Modal component with default max-w-md sizing.</p>
            <div className="mt-4 flex justify-end">
              <Button variant="primary" onClick={() => setModalOpen(false)}>Got it</Button>
            </div>
          </Modal>
          <Modal open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)} title="Confirm Action" size="max-w-sm">
            <p className="text-neutral-700 dark:text-neutral-300">Are you sure you want to proceed? This action cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setConfirmModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setConfirmModalOpen(false)}>Confirm</Button>
            </div>
          </Modal>
          <Modal open={formModalOpen} onClose={() => setFormModalOpen(false)} title="Create Item" size="max-w-lg">
            <div className="space-y-4">
              <Input label="Name" placeholder="Enter name" />
              <Textarea label="Description" placeholder="Enter description" />
              <Select label="Category" options={[{ value: '', label: 'Select...' }, { value: 'a', label: 'Category A' }, { value: 'b', label: 'Category B' }]} />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setFormModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setFormModalOpen(false)}>Create</Button>
            </div>
          </Modal>
        </section>

        {/* ════════════════════════════════════════════════════════════
            17. CHAT BOX & MESSAGES
        ════════════════════════════════════════════════════════════ */}
        <section id="chat-messages" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Chat Box & Messages" description="Inline chat panel and popup dialog mode." />

          {/* Inline chat preview */}
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Inline Chat Panel</h3>
            <div className="rounded-xl border-2 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 overflow-hidden max-w-xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-neutral-200 dark:border-neutral-600">
                <AiBotIcon className="w-7 h-7" />
                <h4 className="text-sm font-semibold uppercase tracking-wide text-accent dark:text-primary">Conversation</h4>
              </div>
              <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                {/* Assistant message */}
                <div className="flex gap-2 max-w-[85%]">
                  <span className="w-7 h-7 rounded-full bg-accent-muted dark:bg-primary/20 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <AiBotIcon className="w-6 h-6" />
                  </span>
                  <div className="rounded-xl px-3 py-2 border-2 bg-neutral-100 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 text-xs">
                    <p className="text-sm leading-relaxed">Hello! How can I help you today?</p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1">10:30 AM</p>
                  </div>
                </div>
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%]">
                    <div className="rounded-xl px-3 py-2 border-2 bg-accent-muted dark:bg-primary/20 border-primary/20 dark:border-primary/30 text-neutral-900 dark:text-neutral-100">
                      <p className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 mb-0.5">You &middot; 10:31 AM</p>
                      <p className="text-sm leading-relaxed">Can you explain gradient descent?</p>
                    </div>
                  </div>
                </div>
                {/* Assistant reply */}
                <div className="flex gap-2 max-w-[85%]">
                  <span className="w-7 h-7 rounded-full bg-accent-muted dark:bg-primary/20 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <AiBotIcon className="w-6 h-6" />
                  </span>
                  <div className="rounded-xl px-3 py-2 border-2 bg-neutral-100 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 text-xs">
                    <p className="text-sm leading-relaxed">Gradient descent is an optimization algorithm used to minimize the loss function in machine learning models...</p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1">10:31 AM</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t-2 border-neutral-200 dark:border-neutral-600">
                <ChatInputBar value="" onChange={() => {}} onSend={() => {}} onFileChange={() => {}} placeholder="Type your question..." />
              </div>
            </div>
          </Card>

          {/* Chat popup button */}
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Chat Popup Dialog</h3>
            <Button variant="primary" onClick={() => setChatDialogOpen(true)}>Open Chat Popup</Button>
          </Card>

          {/* Chat popup modal */}
          {chatDialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setChatDialogOpen(false)}>
              <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-200 dark:border-neutral-600 shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-4 py-3 border-b-2 border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900">
                  <div className="flex items-center gap-2">
                    <AiBotIcon className="w-8 h-8" />
                    <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wide">Together AI — Chat</h2>
                  </div>
                  <button type="button" onClick={() => setChatDialogOpen(false)} className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100" aria-label="Close">
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
                  <div className="flex gap-2 max-w-[90%]">
                    <span className="w-7 h-7 rounded-full bg-accent-muted dark:bg-primary/20 flex-shrink-0 flex items-center justify-center">
                      <AiBotIcon className="w-6 h-6" />
                    </span>
                    <div className="rounded-xl px-3 py-2 border-2 bg-neutral-100 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 text-xs text-neutral-600 dark:text-neutral-300">
                      <p className="text-sm leading-relaxed">Welcome! Ask me anything about your studies.</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[90%] rounded-xl px-3 py-2 border-2 bg-accent-muted dark:bg-primary/20 border-primary/20 dark:border-primary/30 text-neutral-900 dark:text-neutral-100">
                      <p className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 mb-0.5">You</p>
                      <p className="text-sm leading-relaxed">What topics should I study for the exam?</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t-2 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800">
                  <ChatInputBar value={chatValue} onChange={(e) => setChatValue(e.target.value)} onSend={() => {}} onFileChange={() => {}} placeholder="Ask anything..." />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ════════════════════════════════════════════════════════════
            18. QUIZ POPUP
        ════════════════════════════════════════════════════════════ */}
        <section id="quiz-popup" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Quiz Popup" description="QuizletQuizModal: quiz-in-progress and results views." />
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Quiz In-Progress Preview</h3>
            <div className="rounded-xl border-2 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 p-6 max-w-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Question 1 / 5</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-accent-muted dark:bg-primary/20 text-accent dark:text-primary text-[11px] font-semibold">Time 01:30</span>
                  <button type="button" className="px-3 py-1.5 rounded-lg bg-error/10 border border-error/50 text-error text-xs font-medium">Exit</button>
                </div>
              </div>
              <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-600 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-neutral-700 dark:bg-neutral-300 rounded-full w-1/5" />
              </div>
              <p className="text-[11px] font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-3">Topic: Neural Networks</p>
              <p className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug mb-6">&quot;Compare Gradient Descent and Adam optimizer&quot;</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="lg" className="flex-1">Adam is faster</Button>
                <Button variant="secondary" size="lg" className="flex-1">GD is simpler</Button>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Results Preview</h3>
            <div className="rounded-xl border-2 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 p-6 max-w-2xl">
              <h4 className="text-lg font-bold uppercase text-neutral-900 dark:text-neutral-100 text-center mb-8">Analysis results</h4>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-600 bg-neutral-50/50 dark:bg-neutral-700/50 p-6">
                  <p className="text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-3">Questions you got wrong</p>
                  <div className="flex gap-3">
                    <span className="w-1 rounded-full bg-highlight shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Compare Gradient Descent and Adam</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Wrong in questions 2 &amp; 4</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-600 bg-neutral-50/50 dark:bg-neutral-700/50 p-6">
                  <p className="text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-3">Suggested topics</p>
                  {[{ t: 'Optimization algorithms', p: 45 }, { t: 'Optimization algorithms', p: 62 }, { t: 'Optimization algorithms', p: 78 }].map((s, i) => (
                    <div key={i} className="mb-2 last:mb-0">
                      <p className="text-xs text-neutral-900 dark:text-neutral-100 mb-1">{s.t}</p>
                      <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-600 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${s.p}%` }} />
                      </div>
                      <span className="text-[10px] text-neutral-400">{s.p}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-12 py-6 border-t border-neutral-200 dark:border-neutral-600">
                <div className="text-center"><p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">3/5</p><p className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase mt-1">Score</p></div>
                <div className="w-px h-10 bg-neutral-200 dark:bg-neutral-600" />
                <div className="text-center"><p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">03</p><p className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase mt-1">Correct</p></div>
                <div className="w-px h-10 bg-neutral-200 dark:bg-neutral-600" />
                <div className="text-center"><p className="text-xl font-bold text-neutral-900 dark:text-neutral-100">01:30</p><p className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase mt-1">Time spent</p></div>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-100 mb-4">Live Quiz Modal</h3>
            <Button variant="primary" onClick={() => setQuizOpen(true)}>Open Quiz</Button>
          </Card>
          {quizOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setQuizOpen(false)}>
              <div className="bg-white dark:bg-neutral-800 rounded-2xl border-2 border-neutral-200 dark:border-neutral-600 shadow-xl w-full max-w-3xl min-h-[34rem] max-h-[95vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between gap-5 px-10 py-5 border-b border-neutral-200 dark:border-neutral-600">
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Question 1 / 3</span>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-2 rounded-lg bg-accent-muted dark:bg-primary/20 text-accent dark:text-primary text-[11px] font-semibold">Time 00:00</span>
                    <Button variant="secondary" size="sm" className="!bg-error/10 !border-error/50 !text-error hover:!bg-error/20" onClick={() => setQuizOpen(false)}>Exit</Button>
                  </div>
                </div>
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 overflow-y-auto px-10 py-10">
                    <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-600 rounded-full overflow-hidden mb-10">
                      <div className="h-full bg-neutral-700 dark:bg-neutral-300 rounded-full w-1/3" />
                    </div>
                    <p className="text-[11px] font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-4">Topic: Design Systems</p>
                    <p className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug max-w-xl mx-auto">&quot;What color space avoids muddy gradient interpolation?&quot;</p>
                  </div>
                  <div className="shrink-0 flex gap-5 justify-center px-10 py-6 border-t border-neutral-200 dark:border-neutral-600">
                    <Button variant="secondary" size="lg" className="flex-1 max-w-xs">sRGB</Button>
                    <Button variant="primary" size="lg" className="flex-1 max-w-xs">oklch</Button>
                  </div>
                </div>
                <div className="shrink-0 flex justify-end px-10 py-5 border-t border-neutral-200 dark:border-neutral-600">
                  <Button variant="primary" size="sm" onClick={() => setQuizOpen(false)}>Next</Button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ════════════════════════════════════════════════════════════
            19. CARDS
        ════════════════════════════════════════════════════════════ */}
        <section id="cards" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Cards" />
          <div className="grid md:grid-cols-2 gap-4">
            <Card>Plain card with no heading.</Card>
            <Card heading="Card with heading">Content under the heading.</Card>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            20. BADGES
        ════════════════════════════════════════════════════════════ */}
        <section id="badges" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Badges" />
          <Card>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="highlight">Highlight</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            21. PROGRESS
        ════════════════════════════════════════════════════════════ */}
        <section id="progress" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Progress" />
          <Card>
            <div className="space-y-6 max-w-md">
              <Progress value={0} />
              <Progress value={45} />
              <Progress value={75} max={100} label="LEVEL 14" />
              <Progress value={2450} max={3000} label="XP" caption="2,450 / 3,000 XP" />
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            22. BREADCRUMBS
        ════════════════════════════════════════════════════════════ */}
        <section id="breadcrumbs" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Breadcrumbs" />
          <Card>
            <div className="space-y-3">
              <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Calendar' }]} />
              <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Profile', href: '/profile' }, { label: 'Account' }]} />
            </div>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            23. MODALS (demo of base modal component)
        ════════════════════════════════════════════════════════════ */}
        <section id="modals" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Modals" description="Base Modal component." />
          <Card>
            <p className="text-neutral-600 dark:text-neutral-400 mb-3">See Popup Dialog section above for interactive demos.</p>
            <Button variant="primary" onClick={() => setModalOpen(true)}>Open modal</Button>
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            24. CHAT INPUT
        ════════════════════════════════════════════════════════════ */}
        <section id="chat-input" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="ChatInputBar" description="Used in study rooms, AI support, and focus room." />
          <Card>
            <ChatInputBar value={chatValue} onChange={(e) => setChatValue(e.target.value)} onSend={() => {}} onFileChange={() => {}} placeholder="Type a message…" />
          </Card>
        </section>

        {/* ════════════════════════════════════════════════════════════
            25. DIVIDERS & LINKS
        ════════════════════════════════════════════════════════════ */}
        <section id="dividers-links" className="scroll-mt-8 space-y-6">
          <SectionHeading id="" title="Dividers & Links" />
          <Card>
            <div className="space-y-4">
              <p className="text-neutral-700 dark:text-neutral-300">Content above divider.</p>
              <hr className="border-border" />
              <p className="text-neutral-700 dark:text-neutral-300">Content below divider. Use <code className="text-sm bg-neutral-100 dark:bg-neutral-700 px-1 rounded border border-border dark:border-neutral-600">border-border</code> for hr.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#dividers-links" className="text-primary underline hover:no-underline">Primary link</a>
                <a href="#dividers-links" className="text-accent underline hover:no-underline">Accent link</a>
                <span className="text-error">Error text</span>
                <span className="text-success">Success text</span>
                <span className="text-highlight">Highlight text</span>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
