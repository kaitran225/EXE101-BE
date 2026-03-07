import { Link } from 'react-router-dom'
import { Button, Input, Card } from '../../components/ui'

export default function SignUp() {
  return (
    <div className="flex justify-center py-12">
      <Card className="w-96 max-w-96 p-10 rounded-2xl shadow-[0px_0px_30px_0px_rgba(131,0,227,1.00)] outline outline-2 outline-offset-[-2px] outline-blue-300 border-0 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-neutral-900 text-3xl font-bold text-center uppercase tracking-wide">Sign up</h2>
          <p className="text-neutral-900 text-base font-normal text-center">Welcome to your workspace!</p>
        </div>
        <div className="flex flex-col gap-4">
          <form className="flex flex-col gap-5">
            <Input label="Email" placeholder="name@university.edu" type="email" />
            <Input label="Password" placeholder="••••••••" type="password" />
            <Input label="Confirm password" placeholder="••••••••" type="password" />
            <Button type="button" variant="primary" size="lg" className="w-full h-12 rounded-[10px] bg-blue-300 border-2 border-violet-950 text-violet-950 hover:bg-blue-200 uppercase">
              Sign up
            </Button>
          </form>
          <div className="pt-6 border-t-[1.5px] border-neutral-900" />
          <p className="text-center text-sm text-neutral-500">
            Already have an account? <Link to="/welcome" className="font-bold text-neutral-900">Log in</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
