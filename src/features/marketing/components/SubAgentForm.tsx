import { useEffect, useState } from "react";

import {
  createMarketingEmployee,
  updateMarketingEmployee,
  getAgents,
} from "../services/marketing";

import type { MarketingEmployee } from "../types/MarketingEmployee";
interface SubAgentFormProps {

  subAgent?: MarketingEmployee | null;

  onSuccess: () => void;

}
export default function SubAgentForm({

  subAgent,

  onSuccess,

}: SubAgentFormProps) {
    const [employeeId, setEmployeeId] = useState("");

const [fullName, setFullName] = useState("");

const [designation, setDesignation] = useState("");

const [phone, setPhone] = useState("");

const [email, setEmail] = useState("");

const [joiningDate, setJoiningDate] =
useState(
new Date().toISOString().split("T")[0]
);

const [status, setStatus] =
useState<"Active" | "Inactive">(
"Active"
);

const [agentId, setAgentId] =
useState("");

const [agents, setAgents] =
useState<MarketingEmployee[]>([]);
useEffect(() => {

loadAgents();

}, []);

async function loadAgents() {

const data =
await getAgents();

setAgents(data);

}
useEffect(() => {

if (!subAgent) return;

setEmployeeId(subAgent.employee_id);

setFullName(subAgent.full_name);

setDesignation(subAgent.designation);

setPhone(subAgent.phone);

setEmail(subAgent.email);

setJoiningDate(subAgent.joining_date);

setStatus(subAgent.status);

setAgentId(subAgent.manager_id ?? "");

}, [subAgent]);
async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  if (
    !employeeId ||
    !fullName ||
    !designation ||
    !agentId
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const payload = {
    employee_id: employeeId,
    full_name: fullName,
    designation,
    role: "Sub Agent" as const,
    manager_id: agentId,
    phone,
    email,
    joining_date: joiningDate,
    status,
  };

  try {

    if (subAgent) {

      await updateMarketingEmployee(
        subAgent.id,
        payload
      );

      alert("Sub Agent updated successfully.");

    } else {

      await createMarketingEmployee(
        payload
      );

      alert("Sub Agent added successfully.");

    }

    resetForm();

    onSuccess();

  } catch (error) {

    console.error(error);

    alert("Something went wrong.");

  }
}
function resetForm() {
  setEmployeeId("");
  setFullName("");
  setDesignation("");
  setPhone("");
  setEmail("");
  setAgentId("");
  setJoiningDate(
    new Date().toISOString().split("T")[0]
  );
  setStatus("Active");
}
  return (
  <form
    onSubmit={handleSubmit}
    className="rounded-xl bg-white p-6 shadow"
  >
    <h2 className="mb-5 text-xl font-semibold">
      {subAgent ? "Edit Sub Agent" : "Add Sub Agent"}
    </h2>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

      <input
        className="rounded-lg border p-2"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />

      <input
        className="rounded-lg border p-2"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        className="rounded-lg border p-2"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      />

      <select
        className="rounded-lg border p-2"
        value={agentId}
        onChange={(e) => setAgentId(e.target.value)}
      >
        <option value="">
          Select Agent
        </option>

        {agents.map((agent) => (
          <option
            key={agent.id}
            value={agent.id}
          >
            {agent.full_name}
          </option>
        ))}
      </select>

      <input
        className="rounded-lg border p-2"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        className="rounded-lg border p-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="date"
        className="rounded-lg border p-2"
        value={joiningDate}
        onChange={(e) => setJoiningDate(e.target.value)}
      />

      <select
        className="rounded-lg border p-2"
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value as
              | "Active"
              | "Inactive"
          )
        }
      >
        <option value="Active">
          Active
        </option>

        <option value="Inactive">
          Inactive
        </option>
      </select>

    </div>

    <div className="mt-6 flex gap-3">

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white"
      >
        {subAgent ? "Update" : "Save"}
      </button>

      <button
        type="button"
        onClick={resetForm}
        className="rounded-lg bg-slate-600 px-5 py-2 text-white"
      >
        Reset
      </button>

    </div>

  </form>
);

}