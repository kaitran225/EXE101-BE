import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input } from '../../../components/common'

export default function MeetingLobby() {
  const navigate = useNavigate()
  const [roomCode, setRoomCode] = useState('')

  const handleStartNew = () => {
    navigate('/meetings/room')
  }

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!roomCode.trim()) return
    navigate('/meetings/room', { state: { roomCode: roomCode.trim() } })
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto py-8">
      <div className="text-center">
        <h1 className="text-xl font-bold text-neutral-900 mb-1">Meetings</h1>
        <p className="text-sm text-neutral-600">Start a new meeting or join with a room code.</p>
      </div>

      <Card className="p-6 space-y-6">
        <section>
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">Start new meeting</h2>
          <p className="text-xs text-neutral-600 mb-4">Host a meeting and share the room code with others.</p>
          <Button variant="primary" className="w-full" onClick={handleStartNew}>
            Start new meeting
          </Button>
        </section>

        <hr className="border-neutral-200" />

        <section>
          <h2 className="text-sm font-semibold text-neutral-900 mb-3">Join with code</h2>
          <p className="text-xs text-neutral-600 mb-4">Enter the code shared by the host to join.</p>
          <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="text"
              placeholder="Room code (e.g. ABC-123)"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="flex-1 min-w-0"
            />
            <Button type="submit" variant="secondary" className="sm:w-auto">
              Join
            </Button>
          </form>
        </section>
      </Card>

      <p className="text-[10px] text-neutral-500 text-center">
        Mock flow: no real rooms or calls. You will see the meeting UI with sample participants.
      </p>
    </div>
  )
}
