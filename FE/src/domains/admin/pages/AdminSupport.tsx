import { useMemo, useState } from 'react'
import { AdminPageSection, SupportChatList, SupportChatWindow } from '../components'
import { supportChatUsers, supportMessagesByUser } from '../data/supportData'

export default function AdminSupport() {
  const [selectedId, setSelectedId] = useState(supportChatUsers[0]?.id ?? '')
  const selectedUser = supportChatUsers.find((u) => u.id === selectedId) ?? supportChatUsers[0]
  const messages = useMemo(() => supportMessagesByUser[selectedUser.id] ?? [], [selectedUser.id])

  return (
    <div className="flex flex-col gap-4">
      <AdminPageSection title="Support" subtitle="Respond to user issues in real-time chat">
        <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
          <SupportChatList users={supportChatUsers} selectedId={selectedUser.id} onSelect={setSelectedId} />
          <SupportChatWindow
            user={{ name: selectedUser.name, plan: selectedUser.plan, status: selectedUser.status }}
            messages={messages}
          />
        </div>
      </AdminPageSection>
    </div>
  )
}

