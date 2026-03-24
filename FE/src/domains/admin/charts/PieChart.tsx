import type { ChartPoint } from './chartTypes'

interface PieChartProps {
  data: ChartPoint[]
  colors: string[]
}

export function PieChart({ data, colors }: PieChartProps) {
  const radius = 72
  const cx = 90
  const cy = 90
  const total = Math.max(1, data.reduce((acc, item) => acc + item.value, 0))
  let current = -Math.PI / 2

  const slices = data.map((item, idx) => {
    const sweep = (item.value / total) * Math.PI * 2
    const x1 = cx + radius * Math.cos(current)
    const y1 = cy + radius * Math.sin(current)
    const next = current + sweep
    const x2 = cx + radius * Math.cos(next)
    const y2 = cy + radius * Math.sin(next)
    const largeArc = sweep > Math.PI ? 1 : 0
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
    current = next
    return { d, color: colors[idx % colors.length], key: item.label }
  })

  return (
    <div className="flex h-full items-center justify-center">
      <svg viewBox="0 0 180 180" className="h-[220px] w-[220px]" role="img" aria-label="Pie chart">
        {slices.map((slice) => (
          <path key={slice.key} d={slice.d} fill={slice.color} />
        ))}
      </svg>
    </div>
  )
}

