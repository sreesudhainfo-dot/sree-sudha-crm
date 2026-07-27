import { useEffect, useMemo, useState } from "react";

import AttendanceReportTable from "../components/AttendanceReportTable";

import {
  getAttendance,
  getMarketingEmployees,
} from "../services/reports";

export default function AttendanceReportPage() {
  const [employees, setEmployees] =
    useState<any[]>([]);

  const [attendance, setAttendance] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [
        employeeData,
        attendanceData,
      ] = await Promise.all([
        getMarketingEmployees(),
        getAttendance(),
      ]);

      setEmployees(employeeData);
      setAttendance(attendanceData);

    } catch (err) {
      console.error(err);
    }
  }

  const report = useMemo(() => {

    return employees
      .filter((employee) =>
        employee.full_name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .map((employee) => {

        const records =
          attendance.filter(
            (a) =>
              a.employee_id === employee.id
          );

        const present =
          records.filter(
            (a) =>
              a.status === "Present"
          ).length;

        const absent =
          records.filter(
            (a) =>
              a.status === "Absent"
          ).length;

        const leave =
          records.filter(
            (a) =>
              a.status === "Leave"
          ).length;

        const late =
          records.filter(
            (a) =>
              a.status === "Late"
          ).length;

        const total =
          records.length;

        const percentage =
          total === 0
            ? 0
            : Math.round(
                (present / total) * 100
              );

        return {
          employee,
          present,
          absent,
          leave,
          late,
          percentage,
        };

      });

  }, [employees, attendance, search]);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Attendance Report
        </h1>

        <input
          className="rounded-lg border px-4 py-2"
          placeholder="Search Employee"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <AttendanceReportTable
        report={report}
      />

    </div>
  );
}