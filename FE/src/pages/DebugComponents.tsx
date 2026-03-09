import { useState } from 'react'
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
import { jenny, purple, atlitude, mindful, semantic } from '../theme/colors'
import { textColorOn, generateVariants } from '../utils/colorUtils'

const NEUTRALS: { name: string; hex: string }[] = [
  { name: 'neutral-50', hex: '#fafafa' }, { name: 'neutral-100', hex: '#f5f5f5' },
  { name: 'neutral-200', hex: '#e5e5e5' }, { name: 'neutral-300', hex: '#d4d4d4' },
  { name: 'neutral-400', hex: '#a3a3a3' }, { name: 'neutral-500', hex: '#737373' },
  { name: 'neutral-600', hex: '#525252' }, { name: 'neutral-700', hex: '#404040' },
  { name: 'neutral-800', hex: '#262626' }, { name: 'neutral-900', hex: '#171717' },
]

const USER_PALETTE: { name: string; hex: string }[] = [
  { name: 'background', hex: '#f7f7f7' }, { name: 'accentLight', hex: '#85b8fd' },
  { name: 'white', hex: '#ffffff' }, { name: 'highlight', hex: '#ffc757' },
  { name: 'primary', hex: '#4b0082' }, { name: 'textDark', hex: '#171717' },
  { name: 'surfaceAlt', hex: '#e1e1ff' }, { name: 'midnightBlue', hex: '#191970' },
]

/** From image: natural/forest palette (Saffron, Ultra Violet, etc.) */
const NATURAL_PALETTE: { name: string; hex: string }[] = [
  { name: 'saffron', hex: '#F8C662' }, { name: 'ultraViolet', hex: '#595082' },
  { name: 'darkPurple', hex: '#2C263F' }, { name: 'hunterGreen', hex: '#41644A' },
  { name: 'darkGreen', hex: '#213722' },
]

/** From image: Quantus Palette 2025 */
const QUANTUS_2025: { name: string; hex: string }[] = [
  { name: 'electricViolet', hex: '#834DFB' }, { name: 'turbo', hex: '#F0E100' },
  { name: 'haiti', hex: '#18102B' }, { name: 'blueChalk', hex: '#F5F3FF' },
]

/** From image: Brand / corporate colors */
const BRAND_COLORS: { name: string; hex: string }[] = [
  { name: 'ashBlack', hex: '#212529' }, { name: 'lightGrey', hex: '#E6E8EC' },
  { name: 'lightLavender', hex: '#D4CDFF' }, { name: 'corporatePurple', hex: '#8942FE' },
  { name: 'yellow', hex: '#FED728' }, { name: 'lightYellow', hex: '#FFEBA2' },
]

/** From image: Violet/purple palette (Butterfly Bush, etc.) */
const VIOLET_PALETTE: { name: string; hex: string }[] = [
  { name: 'butterflyBush', hex: '#6138a2' }, { name: 'violentViolet', hex: '#361a62' },
  { name: 'pureWhite', hex: '#ffffff' }, { name: 'darkPastelPurple', hex: '#9a75ce' },
  { name: 'jaguar', hex: '#02010a' }, { name: 'electricPurple', hex: '#b129ff' },
  { name: 'haitiPurple', hex: '#180632' }, { name: 'selectiveYellow', hex: '#ffba00' },
]

/** Special: brand palette + typography (Text primary dark: Inkwell · secondary dark: Inkwell 75% · primary light: White · secondary light: White 80%) */
const BRAND_GUIDE_SPECIAL: { name: string; hex: string }[] = [
  { name: 'cobalt', hex: '#4C00FF' }, { name: 'inkwell', hex: '#130032' },
  { name: 'mist', hex: '#CBC2FF' }, { name: 'deepViolet', hex: '#26065D' },
  { name: 'poppy', hex: '#FF5252' }, { name: 'white', hex: '#FFFFFF' },
  { name: 'ecru', hex: '#F8F3F0' },
]

/** Product UI Styleguide / EOS Design System (Behance) — primary teal + surfaces, text, border, status */
const PRODUCT_UI_PALETTE: { name: string; hex: string }[] = [
  { name: 'primary', hex: '#004038' }, { name: 'surface', hex: '#FFFFFF' }, { name: 'surfaceLight', hex: '#F7F7F7' },
  { name: 'surfaceWarm', hex: '#FAF5F7' }, { name: 'surfaceDark', hex: '#1A1A1A' }, { name: 'surfaceNeutral', hex: '#F0F0F0' },
  { name: 'textPrimary', hex: '#000000' }, { name: 'textSecondary', hex: '#666666' }, { name: 'textDisabled', hex: '#E5E5E5' },
  { name: 'borderNeutral', hex: '#DEDEDE' }, { name: 'borderStrong', hex: '#8D8D8D' },
  { name: 'success', hex: '#2E8A45' }, { name: 'warning', hex: '#FFC107' }, { name: 'error', hex: '#DC2545' }, { name: 'info', hex: '#17A2B6' },
  { name: 'focusRing', hex: '#00405840' },
]

const SECTIONS = [
  'colors',
  'eos',
  'buttons',
  'badges',
  'cards',
  'inputs',
  'select',
  'textarea',
  'progress',
  'breadcrumbs',
  'modals',
  'icons',
  'chat-input',
  'theme-tokens',
  'typography',
  'dividers-links',
] as const

function ColorSwatch({ hex, name }: { hex: string; name: string }) {
  const textColor = textColorOn(hex)
  return (
    <div
      className="flex items-center gap-3 rounded-lg border border-neutral-300 p-2 min-w-0"
      style={{ backgroundColor: hex }}
    >
      <span className={`text-xs font-mono font-semibold shrink-0 ${textColor === 'white' ? 'text-white' : 'text-neutral-900'}`}>
        {hex}
      </span>
      <span className={`text-xs truncate ${textColor === 'white' ? 'text-white/95' : 'text-neutral-700'}`}>{name}</span>
    </div>
  )
}

function ColorRowWithVariants({ name, hex }: { name: string; hex: string }) {
  const variants = generateVariants(hex, 10)
  return (
    <div className="flex flex-col sm:flex-row sm:items-stretch gap-2 py-2 border-b border-neutral-200 last:border-b-0 min-w-0">
      <div className="flex items-center gap-2 shrink-0 sm:w-48">
        <span className="text-sm font-semibold text-neutral-900 truncate" title={name}>{name}</span>
        <div
          className="w-12 h-9 rounded border border-neutral-300 shrink-0"
          style={{ backgroundColor: hex }}
          title={hex}
        />
        <span className="text-xs font-mono text-neutral-500 shrink-0">{hex}</span>
      </div>
      <div className="flex flex-1 min-w-0 gap-0.5 sm:gap-1">
        {variants.map((v) => (
          <div
            key={v.hex}
            className="flex-1 min-w-0 min-h-[2.5rem] sm:min-h-[3rem] rounded border border-neutral-300 flex items-center justify-center"
            style={{ backgroundColor: v.hex }}
            title={`${v.hex} ${v.usage ?? ''}`}
          >
            <span className={`text-[8px] sm:text-[10px] font-mono font-semibold truncate px-0.5 ${textColorOn(v.hex) === 'white' ? 'text-white' : 'text-neutral-900'}`}>
              {v.hex}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DebugComponents() {
  const [modalOpen, setModalOpen] = useState(false)
  const [chatValue, setChatValue] = useState('')

  return (
    <div className="min-h-screen bg-background w-full p-6 md:p-8">
      <div className="w-full max-w-[100%] space-y-12">
        <header className="pb-6 border-b border-border">
          <h1 className="text-3xl font-bold text-neutral-900">Debug — components &amp; colors</h1>
          <p className="text-neutral-600 mt-1">All-in-one: UI components, theme tokens, and full color list.</p>
          <nav className="flex flex-wrap gap-2 mt-4">
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm font-medium text-primary underline hover:no-underline"
              >
                {id}
              </a>
            ))}
          </nav>
        </header>

        <section id="colors" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">All colors</h2>
          <Card className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              <div className="col-span-full text-xs font-bold uppercase text-neutral-500 mb-1">Semantic</div>
              {Object.entries(semantic).map(([name, hex]) => (
                <ColorSwatch key={name} hex={hex} name={name} />
              ))}
              <div className="col-span-full text-xs font-bold uppercase text-neutral-500 mt-4 mb-1">Jenny Henderson</div>
              {Object.entries(jenny).map(([name, hex]) => (
                <ColorSwatch key={name} hex={hex} name={name} />
              ))}
              <div className="col-span-full text-xs font-bold uppercase text-neutral-500 mt-4 mb-1">Purple set</div>
              {Object.entries(purple).map(([name, hex]) => (
                <ColorSwatch key={name} hex={hex} name={name} />
              ))}
              <div className="col-span-full text-xs font-bold uppercase text-neutral-500 mt-4 mb-1">ATLITUDE</div>
              {Object.entries(atlitude).map(([name, hex]) => (
                <ColorSwatch key={name} hex={hex} name={name} />
              ))}
              <div className="col-span-full text-xs font-bold uppercase text-neutral-500 mt-4 mb-1">MINDFULPALETTES</div>
              {Object.entries(mindful).map(([name, hex]) => (
                <ColorSwatch key={name} hex={hex} name={name} />
              ))}
              <div className="col-span-full text-xs font-bold uppercase text-neutral-500 mt-4 mb-1">Your palette</div>
              {USER_PALETTE.map(({ name, hex }) => (
                <ColorSwatch key={name} hex={hex} name={name} />
              ))}
              <div className="col-span-full text-xs font-bold uppercase text-neutral-500 mt-4 mb-1">Natural palette</div>
              {NATURAL_PALETTE.map(({ name, hex }) => (
                <ColorSwatch key={name} hex={hex} name={name} />
              ))}
              <div className="col-span-full text-xs font-bold uppercase text-neutral-500 mt-4 mb-1">Quantus 2025</div>
              {QUANTUS_2025.map(({ name, hex }) => (
                <ColorSwatch key={name} hex={hex} name={name} />
              ))}
              <div className="col-span-full text-xs font-bold uppercase text-neutral-500 mt-4 mb-1">Brand colors</div>
              {BRAND_COLORS.map(({ name, hex }) => (
                <ColorSwatch key={name} hex={hex} name={name} />
              ))}
              <div className="col-span-full text-xs font-bold uppercase text-neutral-500 mt-4 mb-1">Violet palette</div>
              {VIOLET_PALETTE.map(({ name, hex }) => (
                <ColorSwatch key={name} hex={hex} name={name} />
              ))}
              <div className="col-span-full mt-4">
                <div className="text-xs font-bold uppercase text-neutral-500 mb-1">Brand guide (special)</div>
                <p className="text-[10px] text-neutral-500 mb-2">Text primary dark: inkwell · secondary dark: inkwell 75% · primary light: white · secondary light: white 80%</p>
              </div>
              {BRAND_GUIDE_SPECIAL.map(({ name, hex }) => (
                <ColorSwatch key={name} hex={hex} name={name} />
              ))}
              <div className="col-span-full text-xs font-bold uppercase text-neutral-500 mt-4 mb-1">Product UI / EOS</div>
              {PRODUCT_UI_PALETTE.map(({ name, hex }) => (
                <ColorSwatch key={name} hex={hex} name={name} />
              ))}
              <div className="col-span-full text-xs font-bold uppercase text-neutral-500 mt-4 mb-1">Neutral</div>
              {NEUTRALS.map(({ name, hex }) => (
                <ColorSwatch key={name} hex={hex} name={name} />
              ))}
            </div>
          </Card>
          <Card className="w-full mt-6">
            <h3 className="text-sm font-bold text-neutral-900 mb-3">10 variants of every color (light → dark)</h3>
            <div className="space-y-0">
              <div className="text-xs font-bold uppercase text-neutral-500 mb-2">Semantic</div>
              {Object.entries(semantic).map(([name, hex]) => (
                <ColorRowWithVariants key={name} name={name} hex={hex} />
              ))}
              <div className="text-xs font-bold uppercase text-neutral-500 mt-4 mb-2">Jenny Henderson</div>
              {Object.entries(jenny).map(([name, hex]) => (
                <ColorRowWithVariants key={name} name={name} hex={hex} />
              ))}
              <div className="text-xs font-bold uppercase text-neutral-500 mt-4 mb-2">Purple set</div>
              {Object.entries(purple).map(([name, hex]) => (
                <ColorRowWithVariants key={name} name={name} hex={hex} />
              ))}
              <div className="text-xs font-bold uppercase text-neutral-500 mt-4 mb-2">ATLITUDE</div>
              {Object.entries(atlitude).map(([name, hex]) => (
                <ColorRowWithVariants key={name} name={name} hex={hex} />
              ))}
              <div className="text-xs font-bold uppercase text-neutral-500 mt-4 mb-2">MINDFULPALETTES</div>
              {Object.entries(mindful).map(([name, hex]) => (
                <ColorRowWithVariants key={name} name={name} hex={hex} />
              ))}
              <div className="text-xs font-bold uppercase text-neutral-500 mt-4 mb-2">Your palette</div>
              {USER_PALETTE.map(({ name, hex }) => (
                <ColorRowWithVariants key={name} name={name} hex={hex} />
              ))}
              <div className="text-xs font-bold uppercase text-neutral-500 mt-4 mb-2">Natural palette</div>
              {NATURAL_PALETTE.map(({ name, hex }) => (
                <ColorRowWithVariants key={name} name={name} hex={hex} />
              ))}
              <div className="text-xs font-bold uppercase text-neutral-500 mt-4 mb-2">Quantus 2025</div>
              {QUANTUS_2025.map(({ name, hex }) => (
                <ColorRowWithVariants key={name} name={name} hex={hex} />
              ))}
              <div className="text-xs font-bold uppercase text-neutral-500 mt-4 mb-2">Brand colors</div>
              {BRAND_COLORS.map(({ name, hex }) => (
                <ColorRowWithVariants key={name} name={name} hex={hex} />
              ))}
              <div className="text-xs font-bold uppercase text-neutral-500 mt-4 mb-2">Violet palette</div>
              {VIOLET_PALETTE.map(({ name, hex }) => (
                <ColorRowWithVariants key={name} name={name} hex={hex} />
              ))}
              <div className="text-xs font-bold uppercase text-neutral-500 mt-4 mb-2">Brand guide (special)</div>
              {BRAND_GUIDE_SPECIAL.map(({ name, hex }) => (
                <ColorRowWithVariants key={name} name={name} hex={hex} />
              ))}
              <div className="text-xs font-bold uppercase text-neutral-500 mt-4 mb-2">Product UI / EOS</div>
              {PRODUCT_UI_PALETTE.map(({ name, hex }) => (
                <ColorRowWithVariants key={name} name={name} hex={hex} />
              ))}
              <div className="text-xs font-bold uppercase text-neutral-500 mt-4 mb-2">Neutral</div>
              {NEUTRALS.map(({ name, hex }) => (
                <ColorRowWithVariants key={name} name={name} hex={hex} />
              ))}
            </div>
          </Card>
        </section>

        <section id="eos" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-2">EOS Design System / Product UI</h2>
          <p className="text-sm text-neutral-600 mb-4">Imitating <a href="https://www.behance.net/gallery/161215951/Eos-Design-System-UI-kit-Library" target="_blank" rel="noopener noreferrer" className="text-primary underline">EOS Design System &amp; UI-kit Library</a> (Behance). Primary: #004038.</p>

          <div className="space-y-8">
            <Card className="w-full">
              <h3 className="text-sm font-bold text-neutral-900 mb-3 uppercase tracking-wide">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-neutral-500">Primary</span>
                  <button type="button" className="px-4 py-2.5 rounded-lg text-white font-medium text-sm uppercase tracking-wide transition-colors hover:opacity-90 active:opacity-100" style={{ backgroundColor: '#004038' }}>Default</button>
                  <button type="button" className="px-4 py-2.5 rounded-lg border-2 font-medium text-sm uppercase tracking-wide transition-colors hover:bg-neutral-100" style={{ borderColor: '#004038', color: '#004038' }}>Secondary</button>
                  <button type="button" className="px-4 py-2.5 rounded-lg font-medium text-sm uppercase tracking-wide transition-colors hover:bg-neutral-100" style={{ color: '#004038' }}>Tertiary</button>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-neutral-500">With icon</span>
                  <button type="button" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium text-sm uppercase tracking-wide" style={{ backgroundColor: '#004038' }}><span aria-hidden>+</span> Enabled</button>
                  <button type="button" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 font-medium text-sm uppercase" style={{ borderColor: '#004038', color: '#004038' }}><span aria-hidden>+</span> Outlined</button>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-neutral-500">States</span>
                  <button type="button" disabled className="px-4 py-2.5 rounded-lg bg-neutral-200 text-neutral-400 font-medium text-sm uppercase cursor-not-allowed">Disabled</button>
                </div>
              </div>
            </Card>

            <Card className="w-full">
              <h3 className="text-sm font-bold text-neutral-900 mb-3 uppercase tracking-wide">Chips</h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium" style={{ backgroundColor: '#1A1A1A' }}>Filter chip <span aria-hidden>×</span></span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border bg-white" style={{ borderColor: '#DEDEDE' }}>Input chip <span aria-hidden>×</span></span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-white text-sm font-medium" style={{ backgroundColor: '#004038' }}>Choice active</span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm border bg-white" style={{ borderColor: '#DEDEDE', color: '#000' }}>Choice inactive</span>
              </div>
            </Card>

            <Card className="w-full">
              <h3 className="text-sm font-bold text-neutral-900 mb-3 uppercase tracking-wide">Tabs</h3>
              <div className="space-y-4">
                <div className="inline-flex rounded-lg p-1 gap-0" style={{ backgroundColor: '#F0F0F0' }}>
                  <button type="button" className="px-4 py-2 rounded-md text-white text-sm font-medium" style={{ backgroundColor: '#004038' }}>Overview</button>
                  <button type="button" className="px-4 py-2 rounded-md text-neutral-600 text-sm font-medium hover:bg-white/50">Billing</button>
                  <button type="button" className="px-4 py-2 rounded-md text-neutral-600 text-sm font-medium hover:bg-white/50">Team</button>
                </div>
                <div className="flex gap-6 border-b border-neutral-200">
                  <button type="button" className="pb-2 text-sm font-medium border-b-2" style={{ borderColor: '#004038', color: '#004038' }}>Overview</button>
                  <button type="button" className="pb-2 text-sm font-medium text-neutral-600 hover:text-neutral-900">Billing</button>
                  <button type="button" className="pb-2 text-sm font-medium text-neutral-600 hover:text-neutral-900">Team</button>
                </div>
              </div>
            </Card>

            <Card className="w-full">
              <h3 className="text-sm font-bold text-neutral-900 mb-3 uppercase tracking-wide">Alerts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(46,138,69,0.15)', color: '#2E8A45' }}><span aria-hidden>✓</span> Success Alert</div>
                <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(255,193,7,0.25)', color: '#996600' }}><span aria-hidden>!</span> Warning Alert</div>
                <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(220,37,69,0.15)', color: '#DC2545' }}><span aria-hidden>!</span> Error Alert</div>
                <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(23,162,182,0.15)', color: '#17A2B6' }}><span aria-hidden>i</span> Info Alert</div>
              </div>
            </Card>

            <Card className="w-full">
              <h3 className="text-sm font-bold text-neutral-900 mb-3 uppercase tracking-wide">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <div className="h-24 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 text-xs mb-3">Image</div>
                  <h4 className="font-bold text-neutral-900 mb-1">Content card</h4>
                  <p className="text-sm text-neutral-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <button type="button" className="px-4 py-2 rounded-lg text-white text-sm font-medium uppercase" style={{ backgroundColor: '#004038' }}>Action</button>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <h4 className="font-bold text-neutral-900 mb-0.5">Data card</h4>
                  <p className="text-xs text-neutral-500 mb-3">Level 13 exittis</p>
                  <div className="flex gap-4">
                    <div><span className="text-2xl font-bold text-neutral-900 block">111</span><span className="text-xs text-neutral-500">Statistics</span></div>
                    <div><span className="text-2xl font-bold text-neutral-900 block">3,358</span><span className="text-xs text-neutral-500">Discdodes</span></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="w-full">
              <h3 className="text-sm font-bold text-neutral-900 mb-3 uppercase tracking-wide">Search input</h3>
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden>⌕</span>
                  <input type="search" placeholder="Search invoices" className="w-full pl-9 pr-4 py-2.5 rounded-lg border-2 bg-white text-neutral-900 placeholder:text-neutral-400" style={{ borderColor: '#DEDEDE' }} />
                </div>
                <div className="relative flex-1 min-w-[200px]">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden>⌕</span>
                  <input type="search" placeholder="Search invoices (focused)" className="w-full pl-9 pr-4 py-2.5 rounded-lg border-2 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none" style={{ borderColor: '#004038', boxShadow: '0 0 0 1px #00405840' }} />
                </div>
              </div>
            </Card>

            <Card className="w-full">
              <h3 className="text-sm font-bold text-neutral-900 mb-3 uppercase tracking-wide">Controls</h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-neutral-500">Checkbox</span>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: '#DEDEDE' }} />
                    <span className="text-sm">Unselected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border-2 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#004038', borderColor: '#004038' }}>✓</div>
                    <span className="text-sm">Selected</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-neutral-500">Radio</span>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2" style={{ borderColor: '#DEDEDE' }} />
                    <span className="text-sm">Unselected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#004038' }}><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#004038' }} /></div>
                    <span className="text-sm">Selected</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-neutral-500">Switch</span>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-6 rounded-full bg-neutral-300" />
                    <span className="text-sm">Off</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-6 rounded-full flex items-center justify-end pr-1" style={{ backgroundColor: '#004038' }}><div className="w-4 h-4 rounded-full bg-white" /></div>
                    <span className="text-sm">On</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="w-full">
              <h3 className="text-sm font-bold text-neutral-900 mb-3 uppercase tracking-wide">EOS purple style (light / dark)</h3>
              <p className="text-xs text-neutral-500 mb-3">Primary #4b0082 · Light fill #e1e1ff · Backgrounds #f7f7f7 / #171717</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#f7f7f7' }}>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <button type="button" className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: '#4b0082' }}>Filled</button>
                    <button type="button" className="px-4 py-2 rounded-lg border-2 text-sm font-medium" style={{ borderColor: '#4b0082', color: '#4b0082' }}>Outline</button>
                    <button type="button" className="px-4 py-2 rounded-lg text-sm font-medium" style={{ color: '#4b0082' }}>Text</button>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-white text-xs" style={{ backgroundColor: '#4b0082' }}>Chip</span>
                    <span className="px-3 py-1 rounded-full text-xs border" style={{ borderColor: '#e1e1ff', backgroundColor: '#e1e1ff', color: '#4b0082' }}>Light</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#171717' }}>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <button type="button" className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: '#4b0082' }}>Filled</button>
                    <button type="button" className="px-4 py-2 rounded-lg border-2 border-neutral-500 text-white text-sm font-medium">Outline</button>
                    <button type="button" className="px-4 py-2 rounded-lg text-white text-sm font-medium">Text</button>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-white text-xs" style={{ backgroundColor: '#4b0082' }}>Chip</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="buttons" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Button</h2>
          <Card>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 mb-2">Variants</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 mb-2">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 mb-2">Disabled</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" disabled>Primary</Button>
                  <Button variant="secondary" disabled>Secondary</Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section id="badges" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Badge</h2>
          <Card>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="highlight">Highlight</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </Card>
        </section>

        <section id="cards" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Card</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>Plain card with no heading.</Card>
            <Card heading="Card with heading">Content under the heading.</Card>
          </div>
        </section>

        <section id="inputs" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Input</h2>
          <Card>
            <div className="space-y-4 max-w-sm">
              <Input placeholder="Placeholder only" />
              <Input label="With label" placeholder="Placeholder" />
              <Input label="With error" error="This field is required." defaultValue="invalid" />
              <Input label="Disabled" disabled placeholder="Disabled" />
            </div>
          </Card>
        </section>

        <section id="select" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Select</h2>
          <Card>
            <div className="space-y-4 max-w-sm">
              <Select
                label="Select option"
                options={[
                  { value: '', label: 'Choose…' },
                  { value: 'a', label: 'Option A' },
                  { value: 'b', label: 'Option B' },
                ]}
              />
              <Select
                label="With error"
                options={[{ value: 'x', label: 'One' }]}
                error="Please select a value."
              />
            </div>
          </Card>
        </section>

        <section id="textarea" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Textarea</h2>
          <Card>
            <div className="space-y-4 max-w-sm">
              <Textarea placeholder="Placeholder only" />
              <Textarea label="With label" placeholder="Enter description" />
              <Textarea label="With error" error="Description is required." />
            </div>
          </Card>
        </section>

        <section id="progress" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Progress</h2>
          <Card>
            <div className="space-y-6 max-w-md">
              <Progress value={0} />
              <Progress value={45} />
              <Progress value={75} max={100} label="LEVEL 14" />
              <Progress value={2450} max={3000} label="XP" caption="2,450 / 3,000 XP" />
            </div>
          </Card>
        </section>

        <section id="breadcrumbs" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Breadcrumbs</h2>
          <Card>
            <div className="space-y-3">
              <Breadcrumbs
                items={[
                  { label: 'Dashboard', href: '/dashboard' },
                  { label: 'Calendar' },
                ]}
              />
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Profile', href: '/profile' },
                  { label: 'Account' },
                ]}
              />
            </div>
          </Card>
        </section>

        <section id="modals" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Modal</h2>
          <Card>
            <p className="text-neutral-600 mb-3">Use for dialogs and confirmations.</p>
            <Button variant="primary" onClick={() => setModalOpen(true)}>Open modal</Button>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Example modal" size="max-w-md">
              <p className="text-neutral-700">Modal content. Close via button or backdrop click.</p>
              <div className="mt-4 flex justify-end">
                <Button variant="primary" onClick={() => setModalOpen(false)}>Close</Button>
              </div>
            </Modal>
          </Card>
        </section>

        <section id="icons" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Icons</h2>
          <Card>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border">
                <AiBotIcon className="w-10 h-10" />
                <span className="text-xs font-medium text-neutral-600">AiBotIcon</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border">
                <CloseIcon className="w-8 h-8 text-neutral-700" />
                <span className="text-xs font-medium text-neutral-600">CloseIcon</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border">
                <AttachIcon className="w-8 h-8 text-neutral-700" />
                <span className="text-xs font-medium text-neutral-600">AttachIcon</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border">
                <MenuIcon className="w-8 h-8 text-neutral-700" />
                <span className="text-xs font-medium text-neutral-600">MenuIcon</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border">
                <DocumentIcon className="w-8 h-8 text-neutral-700" />
                <span className="text-xs font-medium text-neutral-600">DocumentIcon</span>
              </div>
            </div>
          </Card>
        </section>

        <section id="chat-input" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">ChatInputBar</h2>
          <Card>
            <p className="text-neutral-600 mb-3">Used in study rooms, AI support, and focus room.</p>
            <ChatInputBar
              value={chatValue}
              onChange={(e) => setChatValue(e.target.value)}
              onSend={() => {}}
              onFileChange={() => {}}
              placeholder="Type a message…"
            />
          </Card>
        </section>

        <section id="theme-tokens" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Theme tokens</h2>
          <Card>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 mb-2">Semantic colors</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block w-16 h-16 rounded-lg bg-primary" title="primary" />
                  <span className="inline-block w-16 h-16 rounded-lg bg-accent" title="accent" />
                  <span className="inline-block w-16 h-16 rounded-lg bg-accent-muted" title="accent-muted" />
                  <span className="inline-block w-16 h-16 rounded-lg bg-highlight" title="highlight" />
                  <span className="inline-block w-16 h-16 rounded-lg bg-success" title="success" />
                  <span className="inline-block w-16 h-16 rounded-lg bg-warning" title="warning" />
                  <span className="inline-block w-16 h-16 rounded-lg bg-error" title="error" />
                  <span className="inline-block w-16 h-16 rounded-lg bg-surface border border-border" title="surface" />
                </div>
                <p className="text-xs text-neutral-500 mt-1">primary, accent, accent-muted, highlight, success, warning, error, surface</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-neutral-500 mb-2">Gradient utilities</p>
                <div className="flex flex-wrap gap-4">
                  <div className="w-32 h-12 rounded-lg bg-gradient-brand" />
                  <span className="text-lg font-bold text-gradient-brand">Brand text gradient</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">.bg-gradient-brand, .text-gradient-brand</p>
              </div>
            </div>
          </Card>
        </section>

        <section id="typography" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Typography</h2>
          <Card>
            <div className="space-y-4">
              <p className="label-study">Label (label-study)</p>
              <p className="text-base text-neutral-900">Body text. Use text-neutral-900 / text-neutral-600 for hierarchy.</p>
              <p className="text-sm text-neutral-600">Secondary text.</p>
              <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">Small uppercase label</p>
              <a href="#typography" className="text-primary underline hover:no-underline font-medium">Link style</a>
            </div>
          </Card>
        </section>

        <section id="dividers-links" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Dividers &amp; links</h2>
          <Card>
            <div className="space-y-4">
              <p className="text-neutral-700">Content above divider.</p>
              <hr className="border-border" />
              <p className="text-neutral-700">Content below divider. Use <code className="text-sm bg-neutral-100 px-1 rounded border border-border">border-border</code> for hr.</p>
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
