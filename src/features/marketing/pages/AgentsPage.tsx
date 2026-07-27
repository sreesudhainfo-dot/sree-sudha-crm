import { useEffect, useMemo, useState } from "react";

import AgentForm from "../components/AgentForm";
import AgentTable from "../components/AgentTable";

import {
  getAgents,
  getManagers,
  deleteMarketingEmployee,
} from "../services/marketing";

import type { MarketingEmployee } from "../types/MarketingEmployee";
export default function AgentsPage() {

const [agents, setAgents] =
useState<MarketingEmployee[]>([]);

const [managers, setManagers] =
useState<MarketingEmployee[]>([]);

const [editingAgent, setEditingAgent] =
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

const [agentData, managerData] =
await Promise.all([

getAgents(),

getManagers(),

]);

setAgents(agentData);

setManagers(managerData);

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
"Delete this agent?"
);

if (!ok) return;

try {

await deleteMarketingEmployee(id);

await loadData();

alert("Agent deleted.");

}

catch (error) {

console.error(error);

}

}
const filteredAgents =
useMemo(() => {

return agents.filter((agent) =>

agent.full_name
.toLowerCase()
.includes(search.toLowerCase())

||

agent.employee_id
.toLowerCase()
.includes(search.toLowerCase())

);

}, [agents, search]);
if (loading) {

return (

<div className="p-6">

Loading Agents...

</div>

);

}
return (

<div className="space-y-6">

{/* Summary Cards */}

<div className="grid grid-cols-1 gap-4 md:grid-cols-3">

<div className="rounded-xl bg-white p-5 shadow">

<p className="text-slate-500">

Total Agents

</p>

<h2 className="mt-2 text-3xl font-bold">

{agents.length}

</h2>

</div>

<div className="rounded-xl bg-white p-5 shadow">

<p className="text-slate-500">

Active

</p>

<h2 className="mt-2 text-3xl font-bold text-green-600">

{

agents.filter(

a => a.status === "Active"

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

agents.filter(

a => a.status === "Inactive"

).length

}

</h2>

</div>

</div>

{/* Form */}

<AgentForm

agent={editingAgent}

onSuccess={() => {

setEditingAgent(null);

loadData();

}}

/>

{/* Search */}

<div className="rounded-xl bg-white p-5 shadow">

<input

className="w-full rounded-lg border px-4 py-2"

placeholder="Search Agent..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

/>

</div>

{/* Table */}

<AgentTable

agents={filteredAgents}

managers={managers}

onEdit={(agent)=>

setEditingAgent(agent)

}

onDelete={handleDelete}

/>

</div>

);

}