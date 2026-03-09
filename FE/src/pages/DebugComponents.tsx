import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Input,
  Progress,
  Select,
  Textarea,
} from '../components/common'

const SECTIONS = [
  'buttons',
  'badges',
  'cards',
  'inputs',
  'select',
  'textarea',
  'progress',
  'breadcrumbs',
] as const

export default function DebugComponents() {
  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="pb-6 border-b border-neutral-300">
          <h1 className="text-3xl font-bold text-neutral-900">Component list &amp; styles</h1>
          <p className="text-neutral-600 mt-1">Debug page for all UI components and variants.</p>
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
      </div>
    </div>
  )
}
