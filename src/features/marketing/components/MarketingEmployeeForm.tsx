// import { useEffect, useState } from "react";

// import {
//   createMarketingEmployee,
//   updateMarketingEmployee,
//   getManagersDropdown,
//   getAgents,
// } from "../services/marketing";

// import type { MarketingEmployee } from "../types/MarketingEmployee";

// interface MarketingEmployeeFormProps {
//   employee?: MarketingEmployee | null;
//   onSuccess: () => void;
//   onCancel: () => void;
// }

// export default function MarketingEmployeeForm({
//   employee,
//   onSuccess,
//   onCancel,
// }: MarketingEmployeeFormProps) {

//   const [employeeId, setEmployeeId] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [designation, setDesignation] = useState("");

//   const [role, setRole] = useState<
//     "Manager" | "Agent" | "Sub Agent"
//   >("Manager");

//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");

//   const [joiningDate, setJoiningDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );

//   const [status, setStatus] = useState<
//     "Active" | "Inactive"
//   >("Active");

//   const [managerId, setManagerId] = useState("");
//   const [agentId, setAgentId] = useState("");

//   const [managers, setManagers] = useState<any[]>([]);
//   const [agents, setAgents] = useState<any[]>([]);

//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     loadDropdowns();
//   }, []);

//   async function loadDropdowns() {
//     try {
//       const [managerData, agentData] = await Promise.all([
//         getManagersDropdown(),
//         getAgents(),
//       ]);

//       setManagers(managerData);
//       setAgents(agentData);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   useEffect(() => {
//     if (!employee) return;

//     setEmployeeId(employee.employee_id);
//     setFullName(employee.full_name);
//     setDesignation(employee.designation);

//     setRole(employee.role);

//     setPhone(employee.phone);
//     setEmail(employee.email);

//     setJoiningDate(employee.joining_date);

//     setStatus(employee.status);

//     if (employee.role === "Agent") {
//       setManagerId(employee.manager_id ?? "");
//     }

//     if (employee.role === "Sub Agent") {
//       setAgentId(employee.manager_id ?? "");
//     }

//   }, [employee]);
//     function resetForm() {
//     setEmployeeId("");
//     setFullName("");
//     setDesignation("");

//     setRole("Manager");

//     setPhone("");
//     setEmail("");

//     setManagerId("");
//     setAgentId("");

//     setJoiningDate(
//       new Date().toISOString().split("T")[0]
//     );

//     setStatus("Active");
//   }

//   async function handleSubmit(
//     e: React.FormEvent
//   ) {
//     e.preventDefault();

//     if (
//       !employeeId ||
//       !fullName ||
//       !designation
//     ) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     let parentId: string | null = null;

//     if (role === "Agent") {
//       if (!managerId) {
//         alert("Please select a Manager.");
//         return;
//       }

//       parentId = managerId;
//     }

//     if (role === "Sub Agent") {
//       if (!agentId) {
//         alert("Please select an Agent.");
//         return;
//       }

//       parentId = agentId;
//     }

//     const payload = {
//       employee_id: employeeId,
//       full_name: fullName,
//       designation,
//       role,
//       manager_id: parentId,
//       phone,
//       email,
//       joining_date: joiningDate,
//       status,
//     };

//     try {
//       setSaving(true);

//       if (employee) {
//         await updateMarketingEmployee(
//           employee.id,
//           payload
//         );

//         alert("Employee updated successfully.");
//       } else {
//         await createMarketingEmployee(
//           payload
//         );

//         alert("Employee added successfully.");
//       }

//       resetForm();

//       onSuccess();
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong.");
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-6"
//     >
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

//         {/* Employee ID */}

//         <div>
//           <label className="mb-1 block text-sm font-medium">
//             Employee ID
//           </label>

//           <input
//             type="text"
//             value={employeeId}
//             onChange={(e) => setEmployeeId(e.target.value)}
//             className="w-full rounded-lg border px-3 py-2"
//             required
//           />
//         </div>

//         {/* Full Name */}

//         <div>
//           <label className="mb-1 block text-sm font-medium">
//             Full Name
//           </label>

//           <input
//             type="text"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="w-full rounded-lg border px-3 py-2"
//             required
//           />
//         </div>

//         {/* Role */}

//         <div>
//           <label className="mb-1 block text-sm font-medium">
//             Role
//           </label>

//           <select
//             value={role}
//             onChange={(e) =>
//               setRole(
//                 e.target.value as
//                   | "Manager"
//                   | "Agent"
//                   | "Sub Agent"
//               )
//             }
//             className="w-full rounded-lg border px-3 py-2"
//           >
//             <option value="Manager">Manager</option>
//             <option value="Agent">Agent</option>
//             <option value="Sub Agent">Sub Agent</option>
//           </select>
//         </div>

//         {/* Manager */}

//         {role === "Agent" && (
//           <div>
//             <label className="mb-1 block text-sm font-medium">
//               Manager
//             </label>

//             <select
//               value={managerId}
//               onChange={(e) =>
//                 setManagerId(e.target.value)
//               }
//               className="w-full rounded-lg border px-3 py-2"
//             >
//               <option value="">
//                 Select Manager
//               </option>

//               {managers.map((manager) => (
//                 <option
//                   key={manager.id}
//                   value={manager.id}
//                 >
//                   {manager.full_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Agent */}

//         {role === "Sub Agent" && (
//           <div>
//             <label className="mb-1 block text-sm font-medium">
//               Agent
//             </label>

//             <select
//               value={agentId}
//               onChange={(e) =>
//                 setAgentId(e.target.value)
//               }
//               className="w-full rounded-lg border px-3 py-2"
//             >
//               <option value="">
//                 Select Agent
//               </option>

//               {agents.map((agent) => (
//                 <option
//                   key={agent.id}
//                   value={agent.id}
//                 >
//                   {agent.full_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Designation */}

//         <div>
//           <label className="mb-1 block text-sm font-medium">
//             Designation
//           </label>

//           <input
//             type="text"
//             value={designation}
//             onChange={(e) =>
//               setDesignation(e.target.value)
//             }
//             className="w-full rounded-lg border px-3 py-2"
//             required
//           />
//         </div>

//         {/* Phone */}

//         <div>
//           <label className="mb-1 block text-sm font-medium">
//             Phone
//           </label>

//           <input
//             type="text"
//             value={phone}
//             onChange={(e) =>
//               setPhone(e.target.value)
//             }
//             className="w-full rounded-lg border px-3 py-2"
//           />
//         </div>

//         {/* Email */}

//         <div>
//           <label className="mb-1 block text-sm font-medium">
//             Email
//           </label>

//           <input
//             type="email"
//             value={email}
//             onChange={(e) =>
//               setEmail(e.target.value)
//             }
//             className="w-full rounded-lg border px-3 py-2"
//           />
//         </div>
//                 {/* Joining Date */}

//         <div>
//           <label className="mb-1 block text-sm font-medium">
//             Joining Date
//           </label>

//           <input
//             type="date"
//             value={joiningDate}
//             onChange={(e) =>
//               setJoiningDate(e.target.value)
//             }
//             className="w-full rounded-lg border px-3 py-2"
//           />
//         </div>

//         {/* Status */}

//         <div>
//           <label className="mb-1 block text-sm font-medium">
//             Status
//           </label>

//           <select
//             value={status}
//             onChange={(e) =>
//               setStatus(
//                 e.target.value as
//                   | "Active"
//                   | "Inactive"
//               )
//             }
//             className="w-full rounded-lg border px-3 py-2"
//           >
//             <option value="Active">
//               Active
//             </option>

//             <option value="Inactive">
//               Inactive
//             </option>
//           </select>
//         </div>

//       </div>

//       <div className="flex justify-end gap-3 border-t pt-6">

//         <button
//           type="button"
//           onClick={onCancel}
//           className="rounded-lg border border-slate-300 px-5 py-2 font-medium hover:bg-slate-100"
//         >
//           Cancel
//         </button>

//         <button
//           type="button"
//           onClick={resetForm}
//           className="rounded-lg bg-slate-600 px-5 py-2 font-medium text-white hover:bg-slate-700"
//         >
//           Reset
//         </button>

//         <button
//           type="submit"
//           disabled={saving}
//           className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
//         >
//           {saving
//             ? "Saving..."
//             : employee
//             ? "Update Employee"
//             : "Save Employee"}
//         </button>

//       </div>

//     </form>
//   );
// }
import { useEffect, useState } from "react";

import {
  createMarketingEmployee,
  updateMarketingEmployee,
  getManagersDropdown,
  getAgents,
} from "../services/marketing";

import type {
  MarketingEmployee,
  MarketingRole,
  EmployeeStatus,
} from "../types/MarketingEmployee";
interface Props {
  employee?: MarketingEmployee | null;
  onSuccess: () => void;
  onCancel: () => void;
}
export default function MarketingEmployeeForm({
  employee,
  onSuccess,
  onCancel,
}: Props) {
  const [employeeId, setEmployeeId] = useState("");
const [fullName, setFullName] = useState("");
const [designation, setDesignation] = useState("");

const [role, setRole] =
  useState<MarketingRole>("Manager");

const [managerId, setManagerId] =
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
  useState<EmployeeStatus>("Active");

const [managers, setManagers] =
  useState<any[]>([]);

const [agents, setAgents] =
  useState<any[]>([]);
  useEffect(() => {
  loadDropdowns();
}, []);

async function loadDropdowns() {
  try {
    const [managerData, agentData] =
      await Promise.all([
        getManagersDropdown(),
        getAgents(),
      ]);

    setManagers(managerData);
    setAgents(agentData);
  } catch (err) {
    console.error(err);
  }
}
useEffect(() => {
  if (!employee) return;

  setEmployeeId(employee.employee_id);
  setFullName(employee.full_name);
  setDesignation(employee.designation);

  setRole(employee.role);

  setManagerId(employee.manager_id ?? "");

  setPhone(employee.phone);
  setEmail(employee.email);

  setJoiningDate(employee.joining_date);

  setStatus(employee.status);
}, [employee]);
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

  let reportingTo: string | null = null;

  if (role === "Agent") {
    if (!managerId) {
      alert("Please select a Manager.");
      return;
    }

    reportingTo = managerId;
  }

  if (role === "Sub Agent") {
    if (!managerId) {
      alert("Please select an Agent.");
      return;
    }

    reportingTo = managerId;
  }

  const payload = {
    employee_id: employeeId,
    full_name: fullName,
    designation,
    role,
    manager_id: reportingTo,
    phone,
    email,
    joining_date: joiningDate,
    status,
  };

  try {
    if (employee) {
      await updateMarketingEmployee(
        employee.id,
        payload
      );

      alert("Employee updated successfully.");
    } else {
      await createMarketingEmployee(
        payload
      );

      alert("Employee added successfully.");
    }

    resetForm();

    onSuccess();
  } catch (err) {
    console.error(err);
    alert("Unable to save employee.");
  }
}

function resetForm() {
  setEmployeeId("");

  setFullName("");

  setDesignation("");

  setRole("Manager");

  setManagerId("");

  setPhone("");

  setEmail("");

  setJoiningDate(
    new Date().toISOString().split("T")[0]
  );

  setStatus("Active");
}
return (
  <form
    onSubmit={handleSubmit}
    className="space-y-5"
  >
    <h2 className="text-2xl font-bold">
      {employee ? "Edit Employee" : "Add Employee"}
    </h2>

    <div className="grid grid-cols-2 gap-4">

      <input
        className="rounded-lg border p-3"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) =>
          setEmployeeId(e.target.value)
        }
      />

      <input
        className="rounded-lg border p-3"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) =>
          setFullName(e.target.value)
        }
      />

      <input
        className="rounded-lg border p-3"
        placeholder="Designation"
        value={designation}
        onChange={(e) =>
          setDesignation(e.target.value)
        }
      />

      <select
        className="rounded-lg border p-3"
        value={role}
        onChange={(e) => {
          setRole(
            e.target.value as
              | "Manager"
              | "Agent"
              | "Sub Agent"
          );

          setManagerId("");
        }}
      >
        <option value="Manager">
          Manager
        </option>

        <option value="Agent">
          Agent
        </option>

        <option value="Sub Agent">
          Sub Agent
        </option>
      </select>

      {role === "Agent" && (
        <select
          className="rounded-lg border p-3"
          value={managerId}
          onChange={(e) =>
            setManagerId(e.target.value)
          }
        >
          <option value="">
            Select Manager
          </option>

          {managers.map((m) => (
            <option
              key={m.id}
              value={m.id}
            >
              {m.full_name}
            </option>
          ))}
        </select>
      )}

      {role === "Sub Agent" && (
        <select
          className="rounded-lg border p-3"
          value={managerId}
          onChange={(e) =>
            setManagerId(e.target.value)
          }
        >
          <option value="">
            Select Agent
          </option>

          {agents.map((a) => (
            <option
              key={a.id}
              value={a.id}
            >
              {a.full_name}
            </option>
          ))}
        </select>
      )}

      <input
        className="rounded-lg border p-3"
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

      <input
        className="rounded-lg border p-3"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="date"
        className="rounded-lg border p-3"
        value={joiningDate}
        onChange={(e) =>
          setJoiningDate(e.target.value)
        }
      />

      <select
        className="rounded-lg border p-3"
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

    <div className="flex justify-end gap-3 pt-4">

      <button
        type="button"
        onClick={onCancel}
        className="rounded-lg border px-6 py-2"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
      >
        {employee ? "Update" : "Save"}
      </button>

    </div>

  </form>
);
}