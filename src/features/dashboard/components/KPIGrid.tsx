import { FaUsers } from "react-icons/fa";
import { FaUserCheck, FaUserXmark } from "react-icons/fa6";

import KPICard from "./KPICard";

interface Props {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  todayAttendance: number;
}

export default function KPIGrid({
  totalEmployees,
  activeEmployees,
  inactiveEmployees,
  todayAttendance,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      <KPICard
        title="Total Employees"
        value={totalEmployees}
        subtitle="All Employees"
        icon={<FaUsers size={26} />}
        color="bg-blue-600"
        path="/employees"
      />

      <KPICard
        title="Active Employees"
        value={activeEmployees}
        subtitle="Currently Working"
        icon={<FaUserCheck size={26} />}
        color="bg-green-600"
        path="/employees?status=active"
      />

      <KPICard
        title="Inactive Employees"
        value={inactiveEmployees}
        subtitle="Not Working"
        icon={<FaUserXmark size={26} />}
        color="bg-red-600"
        path="/employees?status=inactive"
      />

      <KPICard
        title="Attendance"
        value={todayAttendance}
        subtitle="Today's Attendance"
        icon={<FaUsers size={26} />}
        color="bg-purple-600"
        path="/attendance"
      />

    </div>
  );
}