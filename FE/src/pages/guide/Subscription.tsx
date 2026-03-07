import { Button } from '../../components/ui'

const FREE_FEATURES = [
  'Individual study timers',
  'Basic AI summaries (3/day)',
  'Join up to 2 study squads',
  'Advanced project analytics', // shown dimmed as teaser
]

const PREMIUM_FEATURES = [
  'Unlimited AI-driven features',
  'Infinite study squads',
  'Advanced focus analytics',
  'Priority support',
  'Exclusive gamified rewards',
]

const ENTERPRISE_FEATURES = [
  'White-label options',
  'Dedicated account manager',
  'SSO / .edu integration',
  'Custom AI model training',
]

function FeatureItem({
  text,
  prefix,
  dimmed,
}: {
  text: string
  prefix: '-' | '+'
  dimmed?: boolean
}) {
  return (
    <div
      className={`inline-flex items-start gap-2 ${dimmed ? 'opacity-50' : ''}`}
    >
      <span className="shrink-0 text-sm font-bold leading-5 text-neutral-900">
        {prefix}
      </span>
      <span className="min-w-0 text-sm font-normal leading-5 text-neutral-900">
        {text}
      </span>
    </div>
  )
}

export default function Subscription() {
  return (
    <div className="mx-auto flex w-full max-w-[1160px] flex-col px-4 py-4 sm:px-6">
      {/* Heading — design: 5xl title, gap-6, pb-16; responsive scale */}
      <div className="flex flex-col items-center gap-4 pb-8 sm:gap-5 sm:pb-10 md:gap-6 md:pb-12">
        <h1 className="text-center text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl md:text-4xl md:leading-[2.75rem]">
          Subscription Plans
        </h1>
        <p className="w-full max-w-[28rem] text-center text-sm leading-6 text-neutral-700 sm:max-w-[672px] sm:text-base sm:leading-7">
          Select the plan that best fits your academic goals and collaborative
          needs.
        </p>
      </div>

      {/* Cards — 1 col on small/tablet, 3 equal cols on lg; design: w-96 gap-8 min-h-[500px] p-8 */}
      <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
        {/* FREE — light border per design */}
        <div className="flex min-w-0 flex-col justify-between rounded-2xl border-2 border-neutral-300 bg-neutral-100/80 p-5 sm:p-6 lg:min-h-[420px] lg:p-8">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 pb-4 sm:pb-6">
              <h3 className="text-xl font-bold uppercase leading-8 text-neutral-900 sm:text-2xl">
                Free
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold leading-[2.5rem] text-neutral-900 sm:text-5xl sm:leading-[3rem]">
                  $0
                </span>
                <span className="text-base font-normal leading-7 text-neutral-900 sm:text-lg">
                  /mo
                </span>
              </div>
              <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">
                Perfect for individuals
              </p>
            </div>
            <ul className="flex flex-col gap-3 pb-8 sm:gap-4 sm:pb-10">
              {FREE_FEATURES.map((f, i) => (
                <li key={f} className="flex items-start gap-3">
                  <FeatureItem
                    text={f}
                    prefix="-"
                    dimmed={i === FREE_FEATURES.length - 1}
                  />
                </li>
              ))}
            </ul>
          </div>
          <Button variant="secondary" size="md" className="w-full uppercase">
            Select Free
          </Button>
        </div>

        {/* PREMIUM — black border, white bg, MOST POPULAR badge */}
        <div className="relative flex min-w-0 flex-col justify-between rounded-2xl border-2 border-neutral-900 bg-white p-5 sm:p-6 lg:min-h-[420px] lg:p-8">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-neutral-900 px-3 py-1.5">
            <span className="text-xs font-bold uppercase tracking-wide text-white">
              Most Popular
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 pb-4 sm:pb-6">
              <h3 className="text-xl font-bold uppercase leading-8 text-neutral-900 sm:text-2xl">
                Premium
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold leading-[2.5rem] text-neutral-900 sm:text-5xl sm:leading-[3rem]">
                  $9.99
                </span>
                <span className="text-base font-normal leading-7 text-neutral-900 sm:text-lg">
                  /mo
                </span>
              </div>
              <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">
                For serious students
              </p>
            </div>
            <ul className="flex flex-col gap-3 pb-8 sm:gap-4 sm:pb-10">
              {PREMIUM_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <FeatureItem text={f} prefix="+" />
                </li>
              ))}
            </ul>
          </div>
          <Button variant="primary" size="md" className="w-full uppercase">
            Select Premium
          </Button>
        </div>

        {/* ENTERPRISE — light border, same structure as FREE */}
        <div className="flex min-w-0 flex-col justify-between rounded-2xl border-2 border-neutral-300 bg-neutral-100/80 p-5 sm:p-6 lg:min-h-[420px] lg:p-8">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 pb-4 sm:pb-6">
              <h3 className="text-xl font-bold uppercase leading-8 text-neutral-900 sm:text-2xl">
                Enterprise
              </h3>
              <div className="text-4xl font-bold leading-[2.5rem] text-neutral-900 sm:text-5xl sm:leading-[3rem]">
                Custom
              </div>
              <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">
                For institutions & large groups
              </p>
            </div>
            <ul className="flex flex-col gap-3 pb-8 sm:gap-4 sm:pb-10">
              {ENTERPRISE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <FeatureItem text={f} prefix="-" />
                </li>
              ))}
            </ul>
          </div>
          <Button variant="secondary" size="md" className="w-full uppercase">
            Contact Sales
          </Button>
        </div>
      </div>

      {/* Trusted by — design: small, centered, 4 logos */}
      <section className="flex flex-col items-center gap-4 pt-10 sm:pt-12">
        <h2 className="text-center text-xs font-bold uppercase tracking-wider text-neutral-600 sm:text-sm">
          Trusted by these institutions
        </h2>
        <div className="grid w-full max-w-[520px] grid-cols-2 gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex h-14 items-center justify-center rounded-lg border border-neutral-300 bg-white sm:h-16"
            >
              <span className="text-xs font-medium text-neutral-400 sm:text-sm">
                LOGO
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
