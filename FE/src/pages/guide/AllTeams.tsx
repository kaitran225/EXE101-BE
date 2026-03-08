import { Link } from 'react-router-dom'
import { Button, Card } from '../../components/ui'

export default function AllTeams() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All teams</h1>
        <Button variant="primary">Create team</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[{ name: 'Project Alpha', members: 4 }, { name: 'Study Group Beta', members: 6 }].map((t, i) => (
          <Card key={i}>
            <h3 className="font-bold text-lg mb-2">{t.name}</h3>
            <p className="text-sm text-neutral-500 mb-4">{t.members} members</p>
            <div className="flex gap-2">
              <Link to="/teams/board"><Button variant="secondary" size="sm">Board</Button></Link>
              <Link to="/team-management"><Button variant="secondary" size="sm">Manage</Button></Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
