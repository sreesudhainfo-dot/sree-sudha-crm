import { useEffect, useState } from "react";

import {
  createMarketingEmployee,
  updateMarketingEmployee,
} from "../services/marketing";

import type { MarketingEmployee } from "../types/MarketingEmployee";
interface ManagerFormProps {
  manager?: MarketingEmployee | null;

  onSuccess: () => void;
}
export default function ManagerForm({
  manager,
  onSuccess,
}: ManagerFormProps) {
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
  useEffect(() => {

  if (!manager) return;

  setEmployeeId(manager.employee_id);

  setFullName(manager.full_name);

  setDesignation(manager.designation);

  setPhone(manager.phone);

  setEmail(manager.email);

  setJoiningDate(manager.joining_date);

  setStatus(manager.status);

}, [manager]);
async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  if (
    !employeeId ||
    !fullName ||
    !designation
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const payload = {
    employee_id: employeeId,
    full_name: fullName,
    designation,
    role: "Manager" as const,
    manager_id: null,
    phone,
    email,
    joining_date: joiningDate,
    status,
  };

  try {

    if (manager) {

      await updateMarketingEmployee(
        manager.id,
        payload
      );

      alert("Manager updated successfully.");

    } else {

      await createMarketingEmployee(
        payload
      );

      alert("Manager added successfully.");

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
      {manager ? "Edit Manager" : "Add Manager"}
    </h2>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

      {/* Employee ID */}

      <div>
        <label className="mb-1 block text-sm font-medium">
          Employee ID
        </label>

        <input
          type="text"
          value={employeeId}
          onChange={(e) =>
            setEmployeeId(e.target.value)
          }
          className="w-full rounded-lg border px-3 py-2"
          required
        />
      </div>

      {/* Full Name */}

      <div>
        <label className="mb-1 block text-sm font-medium">
          Full Name
        </label>

        <input
          type="text"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          className="w-full rounded-lg border px-3 py-2"
          required
        />
      </div>

      {/* Designation */}

      <div>
        <label className="mb-1 block text-sm font-medium">
          Designation
        </label>

        <input
          type="text"
          value={designation}
          onChange={(e) =>
            setDesignation(e.target.value)
          }
          className="w-full rounded-lg border px-3 py-2"
          required
        />
      </div>

      {/* Phone */}

      <div>
        <label className="mb-1 block text-sm font-medium">
          Phone
        </label>

        <input
          type="text"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      {/* Email */}

      <div>
        <label className="mb-1 block text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      {/* Joining Date */}

      <div>
        <label className="mb-1 block text-sm font-medium">
          Joining Date
        </label>

        <input
          type="date"
          value={joiningDate}
          onChange={(e) =>
            setJoiningDate(e.target.value)
          }
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      {/* Status */}

      <div>
        <label className="mb-1 block text-sm font-medium">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as
                | "Active"
                | "Inactive"
            )
          }
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>
      </div>

    </div>

    <div className="mt-6 flex gap-3">

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
      >
        {manager ? "Update" : "Save"}
      </button>

      <button
        type="button"
        onClick={resetForm}
        className="rounded-lg bg-slate-600 px-5 py-2 font-medium text-white hover:bg-slate-700"
      >
        Reset
      </button>

    </div>

  </form>
);
}