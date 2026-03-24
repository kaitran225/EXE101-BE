import { useState } from 'react'
import { Button, SegmentedControl, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../../components/common'
import { AdminPageSection, AdminStatusBadge } from '../components'
import { bannedUsersData, reportedUsersData } from '../data/moderationData'

export default function AdminModeration() {
  const [tab, setTab] = useState<'reported' | 'banned'>('reported')

  return (
    <div className="flex flex-col gap-4">
      <AdminPageSection
        title="Moderation"
        subtitle="Review reports and ban records"
        action={
          <SegmentedControl
            value={tab}
            onChange={(v) => setTab(v as 'reported' | 'banned')}
            options={[
              { value: 'reported', label: 'Reported Users' },
              { value: 'banned', label: 'Banned Users' },
            ]}
          />
        }
      >
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
          {tab === 'reported' ? (
            <Table className="min-w-[760px]">
              <TableHead>
                <TableRow className="bg-transparent">
                  <TableHeaderCell>Username</TableHeaderCell>
                  <TableHeaderCell>Report Count</TableHeaderCell>
                  <TableHeaderCell>Reason</TableHeaderCell>
                  <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportedUsersData.map((row) => (
                  <TableRow key={row.username} className="hover:brightness-[1.01]">
                    <TableCell className="px-2 py-3 text-sm font-semibold text-neutral-900">{row.username}</TableCell>
                    <TableCell className="px-2 py-3 text-sm text-neutral-700">{row.reportCount}</TableCell>
                    <TableCell className="px-2 py-3 text-sm text-neutral-700">{row.reason}</TableCell>
                    <TableCell className="px-2 py-3">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Ban</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table className="min-w-[760px]">
              <TableHead>
                <TableRow className="bg-transparent">
                  <TableHeaderCell>Username</TableHeaderCell>
                  <TableHeaderCell>Ban Reason</TableHeaderCell>
                  <TableHeaderCell>Ban Date</TableHeaderCell>
                  <TableHeaderCell>Type</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bannedUsersData.map((row) => (
                  <TableRow key={row.username} className="hover:brightness-[1.01]">
                    <TableCell className="px-2 py-3 text-sm font-semibold text-neutral-900">{row.username}</TableCell>
                    <TableCell className="px-2 py-3 text-sm text-neutral-700">{row.banReason}</TableCell>
                    <TableCell className="px-2 py-3 text-sm text-neutral-700">{row.banDate}</TableCell>
                    <TableCell className="px-2 py-3"><AdminStatusBadge status={row.type} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </AdminPageSection>
    </div>
  )
}

