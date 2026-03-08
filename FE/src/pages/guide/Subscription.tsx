import { Button } from '../../components/ui'

const FREE_FEATURES = [
  'Study rooms',
  'Meeting rooms',
  'Note storage',
  'Planner',
]

const PERSONAL_FEATURES = [
  'Extra study rooms',
  'Extra meeting rooms',
  'Extra storage',
  'Extra planner',
  'Extra mind maps',
  'Extra flashcard',
  'Extra upload PDF',
  'Extra AI summarize',
  'AI analyzes quiz results',
  'Personalized learning roadmap',
  'Extra saveloads',
]

const TEAMS_FEATURES = [
  'Create up to three teams',
  'Maximum of 6 members per team',
  'Extra AI summarize',
  'Member participation analysis',
  'Quick post-meeting quiz',
  'Smart Scheduling',
  'Extra saveloads',
  'Extra create teams',
  'Deadline reminders',
  'End-of-term contribution report',
]

const COMBO_FEATURES = [
  'Study rooms',
  'Mind maps & flashcards',
  'PDF upload, full storage',
  'Create meetings',
  'AI summarize',
  'Advanced learning analytics',
  'Personalized learning roadmap',
  'Member participation analysis',
  'Quick post-meeting quiz',
  'Smart Scheduling',
  'Deadline reminders',
  'End-of-term contribution report',
]

function FeatureItem({
  text,
  prefix,
  light,
}: {
  text: string
  prefix: '-' | '+'
  light?: boolean
}) {
  const textClass = light ? 'text-white' : 'text-neutral-900'
  return (
    <div className="inline-flex items-start gap-2">
      <span className={`shrink-0 text-sm font-bold leading-5 ${textClass}`}>{prefix}</span>
      <span className={`min-w-0 text-sm font-normal leading-5 ${textClass}`}>{text}</span>
    </div>
  )
}

export default function Subscription() {
  return (
    <div className="mx-auto flex w-full max-w-[1160px] flex-col px-4 py-4 sm:px-6">
      <div className="flex flex-col items-center gap-3 pb-6 sm:gap-4 sm:pb-8 md:gap-5 md:pb-10">
        <h1 className="text-center text-xl font-bold uppercase tracking-tight text-neutral-900 sm:text-2xl md:text-3xl md:leading-tight">
          Subscription Plans
        </h1>
        <p className="w-full max-w-[28rem] text-center text-sm leading-6 text-neutral-700 sm:max-w-[672px] sm:text-base sm:leading-7">
          Choose the plan that best fits your learning goals and team study needs.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 lg:gap-4">
        {/* FREE */}
        <div className="flex min-w-0 flex-col justify-between rounded-2xl border-2 border-neutral-300 bg-white p-4 shadow-sm sm:p-5 lg:min-h-[380px] lg:p-6">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 pb-3 sm:pb-4">
              <h3 className="text-xl font-bold uppercase leading-8 text-neutral-900 sm:text-2xl">Free</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold leading-[2.5rem] text-neutral-900 sm:text-5xl sm:leading-[3rem]">$0</span>
                <span className="text-base font-normal leading-7 text-neutral-900 sm:text-lg">/mo</span>
              </div>
              <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">Perfect for individuals</p>
            </div>
            <ul className="flex flex-col gap-2 pb-6 sm:gap-3 sm:pb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <FeatureItem text={f} prefix="-" />
                </li>
              ))}
            </ul>
          </div>
          <Button variant="secondary" size="md" className="w-full uppercase">Start</Button>
        </div>

        {/* PERSONAL */}
        <div className="flex min-w-0 flex-col justify-between rounded-2xl border-2 border-neutral-300 bg-white p-4 shadow-sm sm:p-5 lg:min-h-[380px] lg:p-6">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 pb-3 sm:pb-4">
              <h3 className="text-xl font-bold uppercase leading-8 text-neutral-900 sm:text-2xl">Personal</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold leading-[2.5rem] text-neutral-900 sm:text-5xl sm:leading-[3rem]">$6.99</span>
                <span className="text-base font-normal leading-7 text-neutral-900 sm:text-lg">/mo</span>
              </div>
              <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">Perfect for individuals</p>
            </div>
            <ul className="flex flex-col gap-2 pb-6 sm:gap-3 sm:pb-8">
              {PERSONAL_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <FeatureItem text={f} prefix="-" />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="md" className="flex-1 uppercase">Start</Button>
            <Button variant="secondary" size="md" className="flex-1 uppercase">3 days trial</Button>
          </div>
        </div>

        {/* TEAMS — Most Popular */}
        <div className="relative flex min-w-0 flex-col justify-between rounded-2xl border-2 border-sky-200 bg-sky-100/80 p-4 shadow-md sm:p-5 lg:min-h-[380px] lg:p-6">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded border-2 border-violet-500 bg-violet-500 px-3 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wide text-white">Most Popular</span>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 pb-3 sm:pb-4">
              <h3 className="text-xl font-bold uppercase leading-8 text-neutral-900 sm:text-2xl">Teams</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold leading-[2.5rem] text-neutral-900 sm:text-5xl sm:leading-[3rem]">$9.99</span>
                <span className="text-base font-normal leading-7 text-neutral-900 sm:text-lg">/mo</span>
              </div>
              <p className="text-sm font-normal leading-6 text-neutral-900 sm:text-base">For serious students</p>
            </div>
            <ul className="flex flex-col gap-2 pb-6 sm:gap-3 sm:pb-8">
              {TEAMS_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <FeatureItem text={f} prefix="+"/>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="md" className="flex-1 border-2 border-neutral-800 bg-white text-neutral-900 uppercase hover:bg-neutral-100">Start</Button>
            <Button variant="secondary" size="md" className="flex-1 border-2 border-neutral-800 bg-white text-neutral-900 uppercase hover:bg-neutral-100">3 days trial</Button>
          </div>
        </div>

        {/* COMBO (TEAMS + PERSONAL) Custom */}
        <div className="flex min-w-0 flex-col justify-between rounded-2xl border-2 border-neutral-300 bg-white p-4 shadow-sm sm:p-5 lg:min-h-[380px] lg:p-6">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 pb-3 sm:pb-4">
              <h3 className="text-xl font-bold uppercase leading-8 text-neutral-900 sm:text-2xl">Combo</h3>
              <p className="text-base font-semibold leading-6 text-neutral-700 sm:text-lg">(Teams + Personal)</p>
              <div className="text-4xl font-bold leading-[2.5rem] text-neutral-900 sm:text-5xl sm:leading-[3rem]">Custom</div>
              <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">For institutions & large groups</p>
            </div>
            <ul className="flex flex-col gap-2 pb-6 sm:gap-3 sm:pb-8">
              {COMBO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <FeatureItem text={f} prefix="-" />
                </li>
              ))}
            </ul>
          </div>
          <Button variant="secondary" size="md" className="w-full uppercase">Contact</Button>
        </div>
      </div>

      <section className="flex flex-col items-center gap-4 pt-10 sm:pt-12">
        <h2 className="text-center text-xs font-bold uppercase tracking-wider text-neutral-600 sm:text-sm">
          Trusted by these institutions
        </h2>
        <div className="grid w-full max-w-[520px] grid-cols-2 gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex h-14 items-center justify-center rounded-lg border border-neutral-300 bg-white sm:h-16">
              <span className="text-xs font-medium text-neutral-400 sm:text-sm">LOGO</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
