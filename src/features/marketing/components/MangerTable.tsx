import type { MarketingEmployee } from "../types/MarketingEmployee";

interface ManagerTableProps {
  managers: MarketingEmployee[];

  onEdit: (manager: MarketingEmployee) => void;

  onDelete: (id: string) => void;
}

export default function ManagerTable({
  managers,
  onEdit,
  onDelete,
}: ManagerTableProps) {
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
return (

<div className="overflow-hidden rounded-xl bg-white shadow">

<div className="border-b px-6 py-4">

<h2 className="text-lg font-semibold">

Managers ({managers.length})

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

Designation

</th>

<th className="px-4 py-3 text-left text-sm font-semibold">

Phone

</th>

<th className="px-4 py-3 text-left text-sm font-semibold">

Email

</th>

<th className="px-4 py-3 text-left text-sm font-semibold">

Joining Date

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
    {managers.length === 0 ? (

<tr>

<td
colSpan={8}
className="py-10 text-center text-slate-500"
>

No Managers Found

</td>

</tr>

) : (

managers.map((manager) => (

<tr
key={manager.id}
className="border-t transition hover:bg-slate-50"
>

<td className="px-4 py-3 font-medium">

{manager.employee_id}

</td>

<td className="px-4 py-3">

{manager.full_name}

</td>

<td className="px-4 py-3">

{manager.designation}

</td>

<td className="px-4 py-3">

{manager.phone || "-"}

</td>

<td className="px-4 py-3">

{manager.email || "-"}

</td>

<td className="px-4 py-3">

{formatDate(manager.joining_date)}

</td>

<td className="px-4 py-3">

<span
className={`rounded-full px-3 py-1 text-xs font-semibold ${
manager.status === "Active"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}`}
>

{manager.status}

</span>

</td>

<td className="px-4 py-3">

<div className="flex justify-center gap-2">

<button
onClick={() => onEdit(manager)}
className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
>

Edit

</button>

<button
onClick={() =>
onDelete(manager.id)
}
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