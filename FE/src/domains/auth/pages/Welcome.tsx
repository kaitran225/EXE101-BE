import { useNavigate, Link } from 'react-router-dom'
import { Button, Input } from '../../../components/common'

export default function Welcome() {
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full max-w-[400px] mx-auto">
      <div className="w-full max-w-[380px] p-6 md:p-8 rounded-xl border border-neutral-200 bg-white shadow-sm flex flex-col gap-6">
        <div>
          <h2 className="text-neutral-900 text-2xl font-bold uppercase tracking-wide">Log in</h2>
          <p className="text-neutral-600 text-sm mt-1">Welcome back to your workspace!</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Button type="button" variant="secondary" size="lg" className="w-full min-h-[48px] border border-neutral-300 rounded-xl">
            <span className="text-[#1877F2] font-bold">f</span>
            <span>Continue with Facebook</span>
          </Button>
          <Button type="button" variant="secondary" size="lg" className="w-full min-h-[48px] border border-neutral-300 rounded-xl">
            <span className="text-[#4285F4] font-bold">G</span>
            <span>Continue with Google</span>
          </Button>
          <div className="relative py-2">
            <hr className="border-t border-neutral-200" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-neutral-500">or</span>
          </div>
          <Input label="EMAIL" placeholder="name@university.edu" type="email" />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wide text-neutral-700">PASSWORD</label>
              <Link to="/confirm-mail" className="text-xs text-neutral-500 hover:text-neutral-700">Forgot password?</Link>
            </div>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400 min-h-[44px]"
            />
          </div>
          <Button type="submit" size="lg" className="w-full min-h-[48px] rounded-xl !bg-sky-400 !text-white hover:!bg-sky-500 border-0 font-semibold uppercase">
            Log in
          </Button>
        </form>
        <p className="text-center text-sm text-neutral-500 pt-2 border-t border-neutral-200">
          Don&apos;t have an account? <Link to="/sign-up" className="font-semibold text-sky-600 hover:text-sky-700">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
