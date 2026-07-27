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
    joining_date: "",
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
        full_name: employee.full_name ?? "",
        personal_phone: employee.personal_phone ?? "",
        company_phone: employee.company_phone ?? "",
        email: employee.email ?? "",
        role_id: employee.role_id,
        joining_date: employee.joining_date ?? "",
      });
    } else {
      setForm({
        full_name: "",
        personal_phone: "",
        company_phone: "",
        email: "",
        role_id: 1,
        joining_date: "",
      });
    }
  }, [employee]);

  async function saveEmployee() {
    try {
      if (employee?.id) {
        await updateEmployee(employee.id, form);

        alert("Employee Updated Successfully");
      } else {
        await addEmployee(form);

        alert("Employee Added Successfully");
      }

      onEmployeeAdded();

      setForm({
        full_name: "",
        personal_phone: "",
        company_phone: "",
        email: "",
        role_id: 1,
        joining_date: "",
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

      <h2 className="text-2xl font-bold">
        {employee ? "Edit Employee" : "Add Employee"}
      </h2>

      <input
        className="w-full rounded border p-3"
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
        className="w-full rounded border p-3"
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
        className="w-full rounded border p-3"
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
        type="email"
        className="w-full rounded border p-3"
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
        className="w-full rounded border p-3"
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

      <div>

        <label className="mb-2 block font-medium">
          Date of Joining
        </label>

        <input
          type="date"
          className="w-full rounded border p-3"
          value={form.joining_date}
          onChange={(e) =>
            setForm({
              ...form,
              joining_date: e.target.value,
            })
          }
        />

      </div>

      <div className="flex gap-3">

        <button
          onClick={saveEmployee}
          className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          {employee
            ? "Update Employee"
            : "Save Employee"}
        </button>

      </div>

    </div>
  );
}