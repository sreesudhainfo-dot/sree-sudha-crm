import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        Loading Dashboard...
      </div>
    );
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
  path="/marketing/employees?role=Manager"
/>

<DashboardCard
  title="Agents"
  value={agents}
  color="bg-green-600"
  path="/marketing/employees?role=Agent"
/>

<DashboardCard
  title="Sub Agents"
  value={subAgents}
  color="bg-orange-600"
  path="/marketing/employees?role=Sub Agent"
/>

<DashboardCard
  title="Active Employees"
  value={activeEmployees}
  color="bg-purple-600"
  path="/marketing/employees?status=Active"
/>

<DashboardCard
  title="Inactive Employees"
  value={inactiveEmployees}
  color="bg-red-600"
  path="/marketing/employees?status=Inactive"
/>
      </div>

    </div>
  );

}

interface DashboardCardProps {
  title: string;
  value: number;
  color: string;
  path: string;
}

function DashboardCard({
  title,
  value,
  color,
  path,
}: DashboardCardProps) {

  const navigate = useNavigate();

  return (

    <div
      onClick={() => navigate(path)}
      className={`${color} cursor-pointer rounded-xl p-6 text-white shadow-lg transition duration-200 hover:scale-105 hover:shadow-xl`}
    >

      <p className="text-sm opacity-90">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        {value}
      </h2>

    </div>

  );

}