import { useEffect, useState } from "react";

import TodaySummary from "../components/TodaySummary";
import DashboardHeader from "../components/DashboardHeader";
import KPIGrid from "../components/KPIGrid";
import DepartmentGrid from "../components/DepartmentGrid";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";
// import { getEmployees } from "../../../services/employees";
import { getAttendanceSummary } from "../../attendence/services/attendence";

import {
  getEmployees,
  type Employee,
} from "../../../services/employees";

export default function DashboardPage() {
const [todayAttendance, setTodayAttendance] = useState(0);
  const [employees, setEmployees] =
  useState<Employee[]>([]);

  const [totalEmployees, setTotalEmployees] =
    useState(0);

  const [activeEmployees, setActiveEmployees] =
    useState(0);

  const [inactiveEmployees, setInactiveEmployees] =
    useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const attendance = await getAttendanceSummary();
setTodayAttendance(attendance.present);
    const employees =
  await getEmployees();
  setEmployees(employees);
    try {

      const employees =
        await getEmployees();

      setTotalEmployees(
        employees.length
      );

      setActiveEmployees(
        employees.filter(
          (employee) => employee.is_active
        ).length
      );

      setInactiveEmployees(
        employees.filter(
          (employee) => !employee.is_active
        ).length
      );

    } catch (error) {

      console.error(error);

    }
  }

  return (

    <div className="space-y-8">

      <DashboardHeader />

      <KPIGrid
  totalEmployees={totalEmployees}
  activeEmployees={activeEmployees}
  inactiveEmployees={inactiveEmployees}
  todayAttendance={todayAttendance}
/>
<DepartmentGrid
  employees={employees}
/>
<QuickActions />
<RecentActivity />
<TodaySummary />
    </div>

  );

}