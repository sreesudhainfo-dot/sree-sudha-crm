import { useEffect, useMemo, useState } from "react";

import ManagerForm from "../components/MangerForm";
import ManagerTable from "../components/MangerTable";

import {
  getManagers,
  deleteMarketingEmployee,
} from "../services/marketing";

import type { MarketingEmployee } from "../types/MarketingEmployee";
export default function ManagersPage() {

const [managers, setManagers] =
useState<MarketingEmployee[]>([]);

const [editingManager, setEditingManager] =
useState<MarketingEmployee | null>(null);

const [search, setSearch] =
useState("");

const [loading, setLoading] =
useState(true);
useEffect(() => {

loadManagers();

}, []);

async function loadManagers() {

try {

setLoading(true);

const data =
await getManagers();

setManagers(data);

}

catch (error) {

console.error(error);

}

finally {

setLoading(false);

}

}
async function handleDelete(
id: string
) {

const ok =
window.confirm(
"Delete this manager?"
);

if (!ok) return;

try {

await deleteMarketingEmployee(id);

await loadManagers();

alert("Manager deleted.");

}

catch (error) {

console.error(error);

}

}
const filteredManagers =
useMemo(() => {

return managers.filter((manager) =>

manager.full_name
.toLowerCase()
.includes(search.toLowerCase())

||

manager.employee_id
.toLowerCase()
.includes(search.toLowerCase())

);

}, [managers, search]);
if (loading) {

  return (

    <div className="p-6">

      Loading Managers...

    </div>

  );

}
return (

<div className="space-y-6">

{/* Cards */}

<div className="grid grid-cols-1 gap-4 md:grid-cols-3">

<div className="rounded-xl bg-white p-5 shadow">

<p className="text-slate-500">

Total Managers

</p>

<h2 className="mt-2 text-3xl font-bold">

{managers.length}

</h2>

</div>

<div className="rounded-xl bg-white p-5 shadow">

<p className="text-slate-500">

Active

</p>

<h2 className="mt-2 text-3xl font-bold text-green-600">

{

managers.filter(

m => m.status === "Active"

).length

}

</h2>

</div>

<div className="rounded-xl bg-white p-5 shadow">

<p className="text-slate-500">

Inactive

</p>

<h2 className="mt-2 text-3xl font-bold text-red-600">

{

managers.filter(

m => m.status === "Inactive"

).length

}

</h2>

</div>

</div>

{/* Form */}

<ManagerForm

manager={editingManager}

onSuccess={() => {

setEditingManager(null);

loadManagers();

}}

/>

{/* Search */}

<div className="rounded-xl bg-white p-5 shadow">

<input

placeholder="Search Manager..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

className="w-full rounded-lg border px-4 py-2"

/>

</div>

{/* Table */}

<ManagerTable

managers={filteredManagers}

onEdit={(manager)=>

setEditingManager(manager)

}

onDelete={handleDelete}

/>

</div>

);
}