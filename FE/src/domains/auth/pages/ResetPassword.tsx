import { useNavigate, Link } from 'react-router-dom'
import { Button, Input } from '../../../components/common'

export default function ResetPassword() {
  const navigate = useNavigate()

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/welcome')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full">
      <div className="w-full max-w-[380px] p-6 md:p-8 rounded-xl border border-neutral-200 bg-white shadow-sm flex flex-col gap-6">
        <h2 className="text-neutral-900 text-2xl font-bold uppercase tracking-wide text-center">Reset password</h2>
        <form onSubmit={handleConfirm} className="flex flex-col gap-4">
          <Input label="PASSWORD" placeholder="********" type="password" />
          <Input label="CONFIRM PASSWORD" placeholder="********" type="password" />
          <Button type="submit" size="lg" className="w-full min-h-[48px] rounded-xl !bg-sky-400 !text-white hover:!bg-sky-500 border-0 font-semibold uppercase">
            Confirm
          </Button>
        </form>
        <hr className="border-neutral-200" />
        <p className="text-center text-sm text-neutral-500">
          <Link to="/welcome" className="font-semibold text-sky-600 hover:text-sky-700">Back to log in</Link>
        </p>
      </div>
    </div>
  )
}
