import { useEffect, useState } from "react";
import { getMarketingHierarchy } from "../services/marketing";
import type { MarketingEmployee } from "../types/MarketingEmployee";

export default function MarketingDashboard() {
  const [employees, setEmployees] = useState<MarketingEmployee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getMarketingHierarchy();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const managers = employees.filter(e => e.role === "Manager").length;
  const agents = employees.filter(e => e.role === "Agent").length;
  const subAgents = employees.filter(e => e.role === "Sub Agent").length;
  const activeEmployees = employees.filter(e => e.status === "Active").length;

  if (loading) {
    return <div className="p-6">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Marketing Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Managers"
          value={managers}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Agents"
          value={agents}
          color="bg-green-600"
        />

        <DashboardCard
          title="Sub Agents"
          value={subAgents}
          color="bg-orange-500"
        />

        <DashboardCard
          title="Active Employees"
          value={activeEmployees}
          color="bg-purple-600"
        />

      </div>

    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: number;
  color: string;
}

function DashboardCard({
  title,
  value,
  color,
}: DashboardCardProps) {
  return (
    <div className={`${color} rounded-xl p-6 text-white shadow-lg`}>
      <p className="text-sm opacity-90">{title}</p>
      <h2 className="mt-2 text-4xl font-bold">{value}</h2>
    </div>
  );
}