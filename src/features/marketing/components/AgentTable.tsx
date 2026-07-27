import type { MarketingEmployee } from "../types/MarketingEmployee";

interface AgentTableProps {
  agents: MarketingEmployee[];

  managers: MarketingEmployee[];

  onEdit: (agent: MarketingEmployee) => void;

  onDelete: (id: string) => void;
}

export default function AgentTable({
  agents,
  managers,
  onEdit,
  onDelete,
}: AgentTableProps) {
    const formatDate = (date: string) => {

  if (!date) return "-";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

};
function getManagerName(
  managerId: string | null
) {

  if (!managerId) return "-";

  const manager = managers.find(
    (m) => m.id === managerId
  );

  return manager
    ? manager.full_name
    : "-";

}
return (

<div className="overflow-hidden rounded-xl bg-white shadow">

<div className="border-b px-6 py-4">

<h2 className="text-lg font-semibold">

Agents ({agents.length})

</h2>

</div>

<div className="overflow-x-auto">

<table className="min-w-full">

<thead className="bg-slate-100">

<tr>

<th className="px-4 py-3 text-left text-sm font-semibold">

Employee ID

</th>
<th className="px-4 py-3 text-left text-sm font-semibold">
  Joining Date
</th>
<th className="px-4 py-3 text-left text-sm font-semibold">

Name

</th>

<th className="px-4 py-3 text-left text-sm font-semibold">

Reporting Manager

</th>

<th className="px-4 py-3 text-left text-sm font-semibold">

Designation

</th>

<th className="px-4 py-3 text-left text-sm font-semibold">

Phone

</th>

<th className="px-4 py-3 text-left text-sm font-semibold">

Status

</th>

<th className="px-4 py-3 text-center text-sm font-semibold">

Actions

</th>

</tr>

</thead>

<tbody>
   {agents.length === 0 ? (

<tr>

<td
colSpan={7}
className="py-10 text-center text-slate-500"
>

No Agents Found

</td>

</tr>

) : (

agents.map((agent) => (

<tr
key={agent.id}
className="border-t hover:bg-slate-50 transition-colors"
>

<td className="px-4 py-3 font-medium">

{agent.employee_id}

</td>
<td className="px-4 py-3">
  {formatDate(agent.joining_date)}
</td>
<td className="px-4 py-3">

{agent.full_name}

</td>

<td className="px-4 py-3">

{getManagerName(agent.manager_id)}

</td>

<td className="px-4 py-3">

{agent.designation}

</td>

<td className="px-4 py-3">

{agent.phone || "-"}

</td>

<td className="px-4 py-3">

<span
className={`rounded-full px-3 py-1 text-xs font-semibold ${
agent.status === "Active"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}`}
>

{agent.status}

</span>

</td>

<td className="px-4 py-3">

<div className="flex justify-center gap-2">

<button
onClick={() => onEdit(agent)}
className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
>

Edit

</button>

<button
onClick={() => onDelete(agent.id)}
className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
>

Delete

</button>

</div>

</td>

</tr>

))

)} 
</tbody>

</table>

</div>

</div>

);
}