import { Link } from 'react-router-dom'
import { Button } from '../../components/ui'

/** Standalone result page: same analysis UI as the modal */
const MOCK_RESULT = {
  score: 7,
  total: 10,
  correctCount: 7,
  timeSpent: '01:45',
  wrongQuestions: [
    { topic: 'Compare Gradient Descent and Adam', questionNumbers: [3, 5] },
  ],
  suggestedTopics: [
    { title: 'Optimization algorithms', percent: 45 },
    { title: 'Optimization algorithms', percent: 62 },
    { title: 'Optimization algorithms', percent: 78 },
  ],
}

export default function QuizletResult() {
  const r = MOCK_RESULT

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-lg max-w-2xl w-full overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-end gap-2 px-4 py-3 border-b border-neutral-200">
          <span className="px-3 py-1.5 rounded-lg bg-sky-100 text-sky-800 text-xs font-semibold">
            Time {r.timeSpent}
          </span>
          <Link to="/quizlet">
            <Button variant="secondary" size="sm" className="!bg-red-50 !border-red-200 !text-red-800 hover:!bg-red-100">
              Exit
            </Button>
          </Link>
        </div>
        <div className="p-6">
          <h1 className="text-xl font-bold uppercase text-neutral-900 text-center mb-6">Analysis results</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
              <h2 className="text-xs font-bold uppercase tracking-wide text-neutral-700 mb-3">Questions you got wrong</h2>
              <ul className="space-y-3">
                {r.wrongQuestions.map((w, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-1 flex-shrink-0 rounded-full bg-orange-500" aria-hidden />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{w.topic}</p>
                      <p className="text-xs text-neutral-500">
                        Wrong in questions {w.questionNumbers.join(' & ')}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
              <h2 className="text-xs font-bold uppercase tracking-wide text-neutral-700 mb-3 flex items-center gap-1">
                Suggested topics
                <svg className="w-3.5 h-3.5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </h2>
              <ul className="space-y-2">
                {r.suggestedTopics.map((s, i) => (
                  <li key={i}>
                    <p className="text-xs font-medium text-neutral-900 mb-0.5">{s.title}</p>
                    <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${s.percent}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-neutral-500">{s.percent}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 py-4 border-t border-neutral-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-neutral-900">{r.score}/{r.total}</p>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Score</p>
            </div>
            <div className="w-px h-10 bg-neutral-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-neutral-900">{String(r.correctCount).padStart(2, '0')}</p>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Correct</p>
            </div>
            <div className="w-px h-10 bg-neutral-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-neutral-900">{r.timeSpent}</p>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Time spent</p>
            </div>
          </div>
          <div className="flex gap-3 justify-center mt-4">
            <Link to="/quizlet"><Button variant="primary" size="sm">Retry quiz</Button></Link>
            <Link to="/dashboard"><Button variant="secondary" size="sm">Back to dashboard</Button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
