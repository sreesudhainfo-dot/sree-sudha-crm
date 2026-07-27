import type { MarketingEmployee } from "../types/MarketingEmployee";

interface SubAgentTableProps {
  subAgents: MarketingEmployee[];

  agents: MarketingEmployee[];

  onEdit: (subAgent: MarketingEmployee) => void;

  onDelete: (id: string) => void;
}

export default function SubAgentTable({
  subAgents,
  agents,
  onEdit,
  onDelete,
}: SubAgentTableProps) {
    function getAgentName(
  agentId: string | null
) {

  if (!agentId) return "-";

  const agent = agents.find(
    (a) => a.id === agentId
  );

  return agent
    ? agent.full_name
    : "-";

}
return (

<div className="overflow-hidden rounded-xl bg-white shadow">

<div className="border-b px-6 py-4">

<h2 className="text-lg font-semibold">

Sub Agents ({subAgents.length})

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

Name

</th>

<th className="px-4 py-3 text-left text-sm font-semibold">

Reporting Agent

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
    {subAgents.length === 0 ? (

<tr>

<td
colSpan={7}
className="py-10 text-center text-slate-500"
>

No Sub Agents Found

</td>

</tr>

) : (

subAgents.map((subAgent) => (

<tr
key={subAgent.id}
className="border-t hover:bg-slate-50"
>

<td className="px-4 py-3 font-medium">

{subAgent.employee_id}

</td>

<td className="px-4 py-3">

{subAgent.full_name}

</td>

<td className="px-4 py-3">

{getAgentName(subAgent.manager_id)}

</td>

<td className="px-4 py-3">

{subAgent.designation}

</td>

<td className="px-4 py-3">

{subAgent.phone || "-"}

</td>

<td className="px-4 py-3">

<span
className={`rounded-full px-3 py-1 text-xs font-semibold ${
subAgent.status === "Active"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}`}
>

{subAgent.status}

</span>

</td>

<td className="px-4 py-3">

<div className="flex justify-center gap-2">

<button
onClick={() => onEdit(subAgent)}
className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
>

Edit

</button>

<button
onClick={() => onDelete(subAgent.id)}
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