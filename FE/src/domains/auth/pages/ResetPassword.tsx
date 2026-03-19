import { useNavigate, Link } from 'react-router-dom'
import { Badge, Button, Card, Input } from '../../../components/common'

export default function ResetPassword() {
  const navigate = useNavigate()

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/welcome')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full">
      <Card className="w-full max-w-[400px] p-7 md:p-8 border-2 border-neutral-200 dark:border-[var(--color-charcoal)] shadow-lg bg-white/95 dark:bg-[var(--color-surface)] flex flex-col gap-6">
        <div className="text-center space-y-2">
          <Badge variant="primary" className="normal-case tracking-normal">Secure your account</Badge>
          <h2 className="text-neutral-900 dark:text-neutral-900 text-3xl font-bold tracking-tight">Reset password</h2>
        </div>
        <form onSubmit={handleConfirm} className="flex flex-col gap-4">
          <Input label="PASSWORD" placeholder="********" type="password" />
          <Input label="CONFIRM PASSWORD" placeholder="********" type="password" />
          <Button type="submit" size="lg" className="w-full min-h-[48px] rounded-xl !bg-accent !text-primary-foreground hover:!opacity-90 border-0 font-semibold uppercase">
            Confirm
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
