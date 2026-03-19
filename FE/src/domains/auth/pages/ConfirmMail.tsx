import { Link } from 'react-router-dom'
import { Badge, Button, Card, Input } from '../../../components/common'

export default function ConfirmMail() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full">
      <Card className="w-full max-w-[400px] p-7 md:p-8 border-2 border-neutral-200 dark:border-[var(--color-charcoal)] shadow-lg bg-white/95 dark:bg-[var(--color-surface)] flex flex-col gap-6">
        <div className="text-center space-y-2">
          <Badge variant="focus" className="normal-case tracking-normal">Account recovery</Badge>
          <h2 className="text-neutral-900 dark:text-neutral-900 text-3xl font-bold tracking-tight">Forgot password</h2>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input label="EMAIL" placeholder="name@university.edu" type="email" />
          <Button type="submit" size="lg" className="w-full min-h-[48px] rounded-xl !bg-accent !text-primary-foreground hover:!opacity-90 border-0 font-semibold uppercase">
            Send
          </Button>
        </form>
        <hr className="border-neutral-200" />
        <p className="text-center text-sm text-neutral-500">
          <Link to="/welcome" className="font-semibold text-accent hover:opacity-90">Back to log in</Link>
        </p>
      </Card>
    </div>
  )
}
