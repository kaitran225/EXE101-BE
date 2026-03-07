import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="rounded-2xl bg-white border border-neutral-200/60 shadow-sm p-6 md:p-8 max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight mb-3">
        EXE101
      </h1>
      <p className="text-neutral-600 leading-relaxed mb-2">
        All-in-one learning: personal study, rooms, and team workflow.
      </p>
      <p className="text-sm text-neutral-500 mb-6">
        Services: Auth (8081), Read (8083), Workflow (8082).
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          to="/welcome"
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors duration-150"
        >
          Get started
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 transition-colors duration-150"
        >
          Dashboard
        </Link>
      </div>
    </div>
  )
}
