import { useEffect, useState } from "react";
import StatsCard from "../../../components/cards/StatsCard";
import { getEmployees } from "../../../services/employees";

export default function DashboardPage() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [inactiveEmployees, setInactiveEmployees] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const employees = await getEmployees();

      setTotalEmployees(employees?.length || 0);

      setActiveEmployees(
        employees?.filter((e) => e.is_active).length || 0
      );

      setInactiveEmployees(
        employees?.filter((e) => !e.is_active).length || 0
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome to Sree Sudha Operations Portal
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Employees"
          value={String(totalEmployees)}
          color="text-blue-600"
        />

        <StatsCard
          title="Active Employees"
          value={String(activeEmployees)}
          color="text-green-600"
        />

        <StatsCard
          title="Inactive Employees"
          value={String(inactiveEmployees)}
          color="text-red-600"
        />
      </div>
    </div>
  );
}