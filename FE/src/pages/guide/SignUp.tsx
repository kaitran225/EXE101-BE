import { useNavigate, Link } from 'react-router-dom'
import { Button, Input } from '../../components/common'

export default function SignUp() {
  const navigate = useNavigate()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/personalize')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full">
      <div className="w-full max-w-[380px] p-6 md:p-8 rounded-xl border border-neutral-200 bg-white shadow-sm flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-neutral-900 text-2xl font-bold uppercase tracking-wide">Sign up</h2>
          <p className="text-neutral-600 text-sm mt-1">Welcome to your workspace!</p>
        </div>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <Input label="EMAIL" placeholder="name@university.edu" type="email" />
          <Input label="PASSWORD" placeholder="********" type="password" />
          <Input label="CONFIRM PASSWORD" placeholder="********" type="password" />
          <Button type="submit" size="lg" className="w-full min-h-[48px] rounded-xl !bg-sky-400 !text-white hover:!bg-sky-500 border-0 font-semibold uppercase">
            Sign up
          </Button>
        </form>
        <hr className="border-neutral-200" />
        <p className="text-center text-sm text-neutral-500">
          Already have an account? <Link to="/welcome" className="font-semibold text-sky-600 hover:text-sky-700">Log in</Link>
        </p>
      </div>
    </div>
  )
}
