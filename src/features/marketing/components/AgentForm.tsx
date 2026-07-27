import { useEffect, useState } from "react";

import {
  createMarketingEmployee,
  updateMarketingEmployee,
  getManagersDropdown,
} from "../services/marketing";

import type { MarketingEmployee } from "../types/MarketingEmployee";
interface AgentFormProps {
  agent?: MarketingEmployee | null;

  onSuccess: () => void;
}
export default function AgentForm({
  agent,
  onSuccess,
}: AgentFormProps) {
    const [employeeId, setEmployeeId] =
  useState("");

const [fullName, setFullName] =
  useState("");

const [designation, setDesignation] =
  useState("");

const [phone, setPhone] =
  useState("");

const [email, setEmail] =
  useState("");

const [joiningDate, setJoiningDate] =
  useState(
    new Date().toISOString().split("T")[0]
  );

const [status, setStatus] =
  useState<"Active" | "Inactive">(
    "Active"
  );

const [managerId, setManagerId] =
  useState("");

const [managers, setManagers] =
  useState<any[]>([]);
  useEffect(() => {

  loadManagers();

}, []);

async function loadManagers() {

  const data =
    await getManagersDropdown();

  setManagers(data);

}
useEffect(() => {

  if (!agent) return;

  setEmployeeId(agent.employee_id);

  setFullName(agent.full_name);

  setDesignation(agent.designation);

  setPhone(agent.phone);

  setEmail(agent.email);

  setJoiningDate(agent.joining_date);

  setStatus(agent.status);

  setManagerId(agent.manager_id ?? "");

}, [agent]);
async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  if (
    !employeeId ||
    !fullName ||
    !designation ||
    !managerId
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const payload = {
    employee_id: employeeId,
    full_name: fullName,
    designation,
    role: "Agent" as const,
    manager_id: managerId,
    phone,
    email,
    joining_date: joiningDate,
    status,
  };

  try {

    if (agent) {

      await updateMarketingEmployee(
        agent.id,
        payload
      );

      alert("Agent updated successfully.");

    } else {

      await createMarketingEmployee(
        payload
      );

      alert("Agent added successfully.");

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

  setManagerId("");

  setJoiningDate(
    new Date()
      .toISOString()
      .split("T")[0]
  );

  setStatus("Active");

}
return (
  <form
    onSubmit={handleSubmit}
    className="rounded-xl bg-white p-6 shadow"
  >
    <h2 className="mb-5 text-xl font-semibold">
      {agent ? "Edit Agent" : "Add Agent"}
    </h2>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

      <input
        className="rounded-lg border p-2"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) =>
          setEmployeeId(e.target.value)
        }
      />

      <input
        className="rounded-lg border p-2"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) =>
          setFullName(e.target.value)
        }
      />

      <input
        className="rounded-lg border p-2"
        placeholder="Designation"
        value={designation}
        onChange={(e) =>
          setDesignation(e.target.value)
        }
      />

      <select
        className="rounded-lg border p-2"
        value={managerId}
        onChange={(e) =>
          setManagerId(e.target.value)
        }
      >
        <option value="">
          Select Manager
        </option>

        {managers.map((manager) => (

          <option
            key={manager.id}
            value={manager.id}
          >
            {manager.full_name}
          </option>

        ))}
      </select>

      <input
        className="rounded-lg border p-2"
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

      <input
        className="rounded-lg border p-2"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="date"
        className="rounded-lg border p-2"
        value={joiningDate}
        onChange={(e) =>
          setJoiningDate(e.target.value)
        }
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
        {agent ? "Update" : "Save"}
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