/**
 * Single source of truth for all colors and gradients.
 * Used for non-CSS usage (e.g. charts) and as reference for @theme in index.css.
 */

/** Jenny Henderson palette */
export const jenny = {
  midnight: '#013D5A',
  lionsmane: '#FCF3E3',
  celeste: '#BDD3CE',
  herb: '#708C69',
  marigold: '#F8A258',
} as const

/** Purple set (Chinese Black, Persian Indigo, etc.) */
export const purple = {
  chineseBlack: '#0D0E20',
  persianIndigo: '#2D1C7F',
  majorelleBlue: '#7546E8',
  vodka: '#C8B3F6',
  maxBluePurple: '#B0A9E5',
} as const

/** ATLITUDE palette */
export const atlitude = {
  atlitude1: '#F2E6EE',
  atlitude2: '#FFCCF2',
  atlitude3: '#977DFF',
  atlitude4: '#0033FF',
  atlitude5: '#0600AB',
  atlitude6: '#00033D',
} as const

/** MINDFULPALETTES */
export const mindful = {
  mindful1: '#FBF5F0',
  mindful2: '#C7C2CE',
  mindful3: '#FBD5BD',
  mindful4: '#8A83DA',
  mindful5: '#463699',
  mindful6: '#262335',
} as const

export const palettes = { jenny, purple, atlitude, mindful } as const

/** ATLITUDE gradients (linear, top to bottom) */
export const gradientsAtlitude = {
  gradient1: `linear-gradient(to bottom, ${atlitude.atlitude1}, ${atlitude.atlitude3})`,
  gradient2: `linear-gradient(to bottom, ${atlitude.atlitude2}, ${atlitude.atlitude3}, ${atlitude.atlitude4})`,
  gradient3: `linear-gradient(to bottom, ${atlitude.atlitude3}, ${atlitude.atlitude4}, ${atlitude.atlitude5})`,
  gradient4: `linear-gradient(to bottom, ${atlitude.atlitude4}, ${atlitude.atlitude5}, ${atlitude.atlitude6})`,
} as const

/** MINDFULPALETTES gradients */
export const gradientsMindful = {
  gradient01: `linear-gradient(to bottom, ${mindful.mindful1}, ${mindful.mindful3})`,
  gradient02: `linear-gradient(to bottom, ${mindful.mindful2}, ${mindful.mindful3})`,
  gradient03: `linear-gradient(to bottom, ${mindful.mindful2}, ${mindful.mindful4})`,
  gradient04: `linear-gradient(to bottom, ${mindful.mindful3}, ${mindful.mindful4}, ${mindful.mindful6})`,
  gradient05: `linear-gradient(to bottom, ${mindful.mindful5}, ${mindful.mindful6})`,
} as const

export const gradients = { atlitude: gradientsAtlitude, mindful: gradientsMindful } as const

/** Brand gradient (logo/text): ATLITUDE 3 → 4 */
export const gradientBrand = `linear-gradient(to right, ${atlitude.atlitude3}, ${atlitude.atlitude4})`

/**
 * Semantic colors: default mapping uses ATLITUDE + Purple for a coherent look.
 * Change these to switch the app palette.
 */
export const semantic = {
  primary: atlitude.atlitude3,
  primaryHover: purple.persianIndigo,
  accent: atlitude.atlitude4,
  accentMuted: atlitude.atlitude1,
  surface: atlitude.atlitude1,
  background: '#fafafa',
  highlight: jenny.marigold,
  highlightHover: '#ea580c',
  success: '#059669',
  warning: '#d97706',
  error: '#dc2626',
  border: '#e5e5e5',
  primaryForeground: '#ffffff',
} as const

export type SemanticColorKey = keyof typeof semantic

export function getSemanticColor(name: SemanticColorKey): string {
  return semantic[name]
}
