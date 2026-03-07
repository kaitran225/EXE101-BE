import { Link } from 'react-router-dom'
import { Button, Input, Card } from '../../components/ui'

export default function Welcome() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-16 max-w-[1024px] mx-auto">
      <div className="flex-1 max-w-[480px] flex flex-col gap-8">
        <h1 className="text-neutral-900 text-4xl font-extrabold uppercase leading-10">
          Learn together. Progress together.
        </h1>
        <p className="text-black text-lg font-normal leading-7">
          Together helps you stay motivated, study more effectively, and build real skills through social and personalized learning.
        </p>
      </div>
      <Card className="w-96 max-w-96 p-10 rounded-2xl shadow-[0px_0px_30px_0px_rgba(131,0,227,1.00)] outline outline-2 outline-offset-[-2px] outline-blue-300 border-0 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-black text-3xl font-bold uppercase tracking-wide">Log in</h2>
          <p className="text-neutral-900 text-base font-normal">Welcome back to your workspace!</p>
        </div>
        <div className="flex flex-col gap-4">
          <Button variant="secondary" size="lg" className="w-full h-12 rounded-[10px] border-[1.5px] border-neutral-900">
            Continue with Facebook
          </Button>
          <Button variant="secondary" size="lg" className="w-full h-12 rounded-[10px] border-[1.5px] border-neutral-900">
            Continue with Google
          </Button>
          <div className="relative py-4">
            <hr className="border-t-[1.5px] border-neutral-900" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm font-bold lowercase">OR</span>
          </div>
          <form className="flex flex-col gap-5">
            <Input label="Email" placeholder="name@university.edu" type="email" />
            <div className="flex justify-between items-center">
              <label className="text-neutral-900 text-sm font-bold uppercase tracking-wide">Password</label>
              <Link to="/confirm-mail" className="text-xs text-neutral-500">Forgot password?</Link>
            </div>
            <Input placeholder="••••••••" type="password" />
            <Link to="/dashboard">
              <Button type="button" variant="primary" size="lg" className="w-full h-12 rounded-[10px] bg-blue-300 border-2 border-violet-950 text-violet-950 hover:bg-blue-200">
                Log in
              </Button>
            </Link>
          </form>
          <p className="text-center text-sm text-neutral-500 pt-4 border-t-[1.5px] border-neutral-900">
            Don&apos;t have an account? <Link to="/sign-up" className="font-bold text-neutral-900">Sign up</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
