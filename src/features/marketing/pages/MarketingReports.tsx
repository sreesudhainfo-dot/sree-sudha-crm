import { useEffect, useMemo, useState } from "react";
import { getMarketingHierarchy } from "../services/marketing";
import type { MarketingEmployee } from "../types/MarketingEmployee";

export default function MarketingReports() {
  const [employees, setEmployees] = useState<MarketingEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getMarketingHierarchy();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (employee) =>
        employee.full_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.employee_id
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [employees, search]);

  const totalManagers = employees.filter(
    (e) => e.role === "Manager"
  ).length;

  const totalAgents = employees.filter(
    (e) => e.role === "Agent"
  ).length;

  const totalSubAgents = employees.filter(
    (e) => e.role === "Sub Agent"
  ).length;

  const activeEmployees = employees.filter(
    (e) => e.status === "Active"
  ).length;

  if (loading) {
    return (
      <div className="p-6">
        Loading Reports...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Marketing Reports
      </h1>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

        <ReportCard
          title="Managers"
          value={totalManagers}
          color="bg-blue-600"
        />

        <ReportCard
          title="Agents"
          value={totalAgents}
          color="bg-green-600"
        />

        <ReportCard
          title="Sub Agents"
          value={totalSubAgents}
          color="bg-orange-500"
        />

        <ReportCard
          title="Active Employees"
          value={activeEmployees}
          color="bg-purple-600"
        />

      </div>

      {/* Search */}

      <div className="rounded-xl bg-white p-5 shadow">

        <input
          className="w-full rounded-lg border px-4 py-2"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Employee ID
              </th>

              <th className="px-4 py-3 text-left">
                Name
              </th>

              <th className="px-4 py-3 text-left">
                Role
              </th>

              <th className="px-4 py-3 text-left">
                Designation
              </th>

              <th className="px-4 py-3 text-left">
                Phone
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredEmployees.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-10 text-center text-slate-500"
                >
                  No Employees Found
                </td>

              </tr>

            ) : (

              filteredEmployees.map((employee) => (

                <tr
                  key={employee.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-4 py-3">
                    {employee.employee_id}
                  </td>

                  <td className="px-4 py-3">
                    {employee.full_name}
                  </td>

                  <td className="px-4 py-3">
                    {employee.role}
                  </td>

                  <td className="px-4 py-3">
                    {employee.designation}
                  </td>

                  <td className="px-4 py-3">
                    {employee.phone || "-"}
                  </td>

                  <td className="px-4 py-3">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        employee.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

interface ReportCardProps {
  title: string;
  value: number;
  color: string;
}

function ReportCard({
  title,
  value,
  color,
}: ReportCardProps) {
  return (
    <div className={`${color} rounded-xl p-6 text-white shadow`}>
      <p className="text-sm opacity-90">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        {value}
      </h2>
    </div>
  );
}