import { useEffect, useState } from "react";
import {
  addEmployee,
  updateEmployee,
  type Employee,
} from "../../../services/employees";
import { getRoles } from "../../../services/roles";

interface Props {
  employee: Employee | null;
  onEmployeeAdded: () => void;
}

interface Role {
  id: number;
  role_name: string;
}

export default function EmployeeForm({
  employee,
  onEmployeeAdded,
}: Props) {
  const [roles, setRoles] = useState<Role[]>([]);

  const [form, setForm] = useState({
    full_name: "",
    personal_phone: "",
    company_phone: "",
    email: "",
    role_id: 1,
  });

  useEffect(() => {
    async function loadRoles() {
      try {
        const data = await getRoles();
        setRoles(data || []);
      } catch (err) {
        console.error(err);
      }
    }

    loadRoles();
  }, []);

  useEffect(() => {
    if (employee) {
      setForm({
        full_name: employee.full_name,
        personal_phone: employee.personal_phone,
        company_phone: employee.company_phone,
        email: employee.email,
        role_id: employee.role_id,
      });
    } else {
      setForm({
        full_name: "",
        personal_phone: "",
        company_phone: "",
        email: "",
        role_id: 1,
      });
    }
  }, [employee]);

  async function saveEmployee() {
    try {
      if (employee?.id) {
        await updateEmployee(employee.id, form);

        alert("Employee Updated ✅");
      } else {
        await addEmployee(form);

        alert("Employee Added ✅");
      }

      onEmployeeAdded();

      setForm({
        full_name: "",
        personal_phone: "",
        company_phone: "",
        email: "",
        role_id: 1,
      });

    } catch (err) {
      console.error(err);

      const error = err as {
        code?: string;
        message?: string;
      };

      if (error.code === "23505") {
        alert("Email already exists.");
      } else {
        alert(error.message || "Something went wrong.");
      }
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow space-y-4">

      <h2 className="text-xl font-bold">
        {employee ? "Edit Employee" : "Add Employee"}
      </h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e) =>
          setForm({
            ...form,
            full_name: e.target.value,
          })
        }
      />

      <input
        type="tel"
        maxLength={13}
        className="w-full border p-2 rounded"
        placeholder="Personal Phone"
        value={form.personal_phone}
        onChange={(e) =>
          setForm({
            ...form,
            personal_phone: e.target.value
              .replace(/\D/g, "")
              .slice(0, 13),
          })
        }
      />

      <input
        type="tel"
        maxLength={13}
        className="w-full border p-2 rounded"
        placeholder="Company Phone"
        value={form.company_phone}
        onChange={(e) =>
          setForm({
            ...form,
            company_phone: e.target.value
              .replace(/\D/g, "")
              .slice(0, 13),
          })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />
            <select
        className="w-full border p-2 rounded"
        value={form.role_id}
        onChange={(e) =>
          setForm({
            ...form,
            role_id: Number(e.target.value),
          })
        }
      >
        {roles.map((role) => (
          <option
            key={role.id}
            value={role.id}
          >
            {role.role_name}
          </option>
        ))}
      </select>

      <div className="flex gap-3">

        <button
          onClick={saveEmployee}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {employee ? "Update Employee" : "Save Employee"}
        </button>

        {employee && (
          <button
            onClick={() =>
              setForm({
                full_name: "",
                personal_phone: "",
                company_phone: "",
                email: "",
                role_id: 1,
              })
            }
            className="rounded border border-slate-300 px-4 py-2 hover:bg-slate-100"
          >
            Cancel
          </button>
        )}

      </div>
    </div>
  );
}