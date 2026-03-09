import { Card } from '../../../components/common'

export default function Transaction() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Type</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-100">
              <td className="py-2">Today</td>
              <td className="py-2">XP earned</td>
              <td className="py-2 text-right">+50</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  )
}
