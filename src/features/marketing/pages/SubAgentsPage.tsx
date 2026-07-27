import { useEffect, useMemo, useState } from "react";

import SubAgentForm from "../components/SubAgentForm";
import SubAgentTable from "../components/SubAgentTable";

import {
  getSubAgents,
  getAgents,
  deleteMarketingEmployee,
} from "../services/marketing";

import type { MarketingEmployee } from "../types/MarketingEmployee";
export default function SubAgentsPage() {

const [subAgents, setSubAgents] =
useState<MarketingEmployee[]>([]);

const [agents, setAgents] =
useState<MarketingEmployee[]>([]);

const [editingSubAgent, setEditingSubAgent] =
useState<MarketingEmployee | null>(null);

const [search, setSearch] =
useState("");

const [loading, setLoading] =
useState(true);
useEffect(() => {

loadData();

}, []);

async function loadData() {

try {

setLoading(true);

const [subAgentData, agentData] =
await Promise.all([

getSubAgents(),

getAgents(),

]);

setSubAgents(subAgentData);

setAgents(agentData);

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
"Delete this sub agent?"
);

if (!ok) return;

try {

await deleteMarketingEmployee(id);

await loadData();

alert("Sub Agent deleted.");

}

catch (error) {

console.error(error);

}

}
const filteredSubAgents =
useMemo(() => {

return subAgents.filter((subAgent) =>

subAgent.full_name
.toLowerCase()
.includes(search.toLowerCase())

||

subAgent.employee_id
.toLowerCase()
.includes(search.toLowerCase())

);

}, [subAgents, search]);

if (loading) {

return (

    

<div className="p-6">

Loading Sub Agents...

</div>

);

}
return (

<div className="space-y-6">

<div className="grid grid-cols-1 gap-4 md:grid-cols-3">

<div className="rounded-xl bg-white p-5 shadow">

<p className="text-slate-500">
Total Sub Agents
</p>

<h2 className="mt-2 text-3xl font-bold">
{subAgents.length}
</h2>

</div>

<div className="rounded-xl bg-white p-5 shadow">

<p className="text-slate-500">
Active
</p>

<h2 className="mt-2 text-3xl font-bold text-green-600">

{subAgents.filter(
s => s.status === "Active"
).length}

</h2>

</div>

<div className="rounded-xl bg-white p-5 shadow">

<p className="text-slate-500">
Inactive
</p>

<h2 className="mt-2 text-3xl font-bold text-red-600">

{subAgents.filter(
s => s.status === "Inactive"
).length}

</h2>

</div>

</div>

<SubAgentForm

subAgent={editingSubAgent}

onSuccess={() => {

setEditingSubAgent(null);

loadData();

}}

/>

<div className="rounded-xl bg-white p-5 shadow">

<input

className="w-full rounded-lg border px-4 py-2"

placeholder="Search Sub Agent..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

/>

</div>

<SubAgentTable

subAgents={filteredSubAgents}

agents={agents}

onEdit={(subAgent)=>

setEditingSubAgent(subAgent)

}

onDelete={handleDelete}

/>

</div>

);

}

