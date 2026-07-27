import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import EmployeeTable from "../components/EmployeeTable";

import {
  getEmployees,
  type Employee,
} from "../../../services/employees";

export default function EmployeesPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");

  const status = searchParams.get("status");

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data ?? []);
    } catch (err) {
      console.error(err);
    }
  }

  const filteredEmployees = useMemo(() => {
    let data = [...employees];

    if (status === "active") {
      data = data.filter((e) => e.is_active);
    }

    if (status === "inactive") {
      data = data.filter((e) => !e.is_active);
    }

    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter((e) =>
        e.full_name?.toLowerCase().includes(keyword) ||
        e.employee_id?.toLowerCase().includes(keyword) ||
        e.personal_phone?.includes(keyword) ||
        e.company_phone?.includes(keyword) ||
        e.email?.toLowerCase().includes(keyword)
      );
    }

    return data;
  }, [employees, search, status]);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Employees
          </h1>

          <p className="text-slate-500">
            Manage company employees
          </p>
        </div>

        <button
          onClick={() => navigate("/employees/new")}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          + Add Employee
        </button>

      </div>

      <div className="rounded-xl bg-white p-5 shadow">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search employee..."
          className="w-full rounded-lg border p-3"
        />

      </div>

      <EmployeeTable
        employees={filteredEmployees}
        onRefresh={loadEmployees}
        onEdit={(employee) =>
          navigate(`/employees/edit/${employee.id}`)
        }
      />

    </div>
  );
}