import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MarketingEmployeeTable from "../components/MarketingEmployeeTable";
import MarketingEmployeeModal from "../components/MarketingEmployeeModal";

import {
  getMarketingEmployees,
  deleteMarketingEmployee,
} from "../services/marketing";

import type { MarketingEmployee } from "../types/MarketingEmployee";

export default function MarketingEmployeesPage() {
  const [employees, setEmployees] = useState<MarketingEmployee[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingEmployee, setEditingEmployee] =
    useState<MarketingEmployee | null>(null);
const [searchParams] = useSearchParams();

const roleFilter = searchParams.get("role");

const statusFilter = searchParams.get("status");
  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      setLoading(true);

      const data = await getMarketingEmployees();

      setEmployees(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this employee?")) return;

    await deleteMarketingEmployee(id);

    loadEmployees();
  }

 const filteredEmployees = useMemo(() => {
  return employees.filter((employee) => {
    const matchesSearch =
      employee.full_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      employee.employee_id
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      employee.phone.includes(search);

    const matchesRole = roleFilter
      ? employee.role === roleFilter
      : true;

    const matchesStatus = statusFilter
      ? employee.status === statusFilter
      : true;

    return (
      matchesSearch &&
      matchesRole &&
      matchesStatus
    );
  });
}, [
  employees,
  search,
  roleFilter,
  statusFilter,
]);

  const managers = employees.filter(
    (e) => e.role === "Manager"
  ).length;

  const agents = employees.filter(
    (e) => e.role === "Agent"
  ).length;

  const subAgents = employees.filter(
    (e) => e.role === "Sub Agent"
  ).length;

  const activeEmployees = employees.filter(
    (e) => e.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (e) => e.status === "Inactive"
  ).length;

  if (loading) {
    return (
      <div className="p-6">
        Loading Marketing Employees...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Marketing Employees
          </h1>

          <p className="text-slate-500">
            Manage your complete marketing team
          </p>
        </div>

        <button
          onClick={() => {
            setEditingEmployee(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          + Add Employee
        </button>

      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">

        <SummaryCard
          title="Managers"
          value={managers}
          color="bg-blue-600"
        />

        <SummaryCard
          title="Agents"
          value={agents}
          color="bg-green-600"
        />

        <SummaryCard
          title="Sub Agents"
          value={subAgents}
          color="bg-orange-600"
        />

        <SummaryCard
          title="Active"
          value={activeEmployees}
          color="bg-emerald-600"
        />

        <SummaryCard
          title="Inactive"
          value={inactiveEmployees}
          color="bg-red-600"
        />

      </div>

      <div className="rounded-xl bg-white p-5 shadow">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search employee..."
          className="w-full rounded-lg border px-4 py-2"
        />

      </div>

      <MarketingEmployeeTable
        employees={filteredEmployees}
        onEdit={(employee) => {
          setEditingEmployee(employee);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      <MarketingEmployeeModal
        open={showForm}
        employee={editingEmployee}
        onClose={() => {
          setShowForm(false);
          setEditingEmployee(null);
        }}
        onSuccess={() => {
          loadEmployees();
          setShowForm(false);
          setEditingEmployee(null);
        }}
      />

    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: number;
  color: string;
}

function SummaryCard({
  title,
  value,
  color,
}: SummaryCardProps) {
  return (
    <div className={`${color} rounded-xl p-5 text-white shadow`}>
      <p className="text-sm opacity-90">{title}</p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}