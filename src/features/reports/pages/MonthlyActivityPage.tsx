import { useEffect, useMemo, useState } from "react";

import MonthlyActivity from "../components/MonthlyActivity";

import {
  getAttendance,
  getCustomers,
  getLeads,
  getMarketingEmployees,
} from "../services/reports";

export default function MonthlyActivityPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [
        employeeData,
        attendanceData,
        customerData,
        leadData,
      ] = await Promise.all([
        getMarketingEmployees(),
        getAttendance(),
        getCustomers(),
        getLeads(),
      ]);

      setEmployees(employeeData);
      setAttendance(attendanceData);
      setCustomers(customerData);
      setLeads(leadData);

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

        const employeeAttendance =
          attendance.filter(
            (a) => a.employee_id === employee.id
          );

        const employeeLeads =
          leads.filter(
            (l) => l.assigned_to === employee.id
          );

        const employeeCustomers =
          customers.filter(
            (c) => c.assigned_to === employee.id
          );

        const siteVisits =
          employeeCustomers.filter(
            (c) => c.site_visit_date
          );

        const bookings =
          employeeCustomers.filter(
            (c) => c.booking_amount
          );

        const revenue =
          bookings.reduce(
            (sum, customer) =>
              sum +
              Number(customer.booking_amount ?? 0),
            0
          );

        const attendancePercentage =
          employeeAttendance.length === 0
            ? 0
            : Math.round(
                (employeeAttendance.filter(
                  (a) => a.status === "Present"
                ).length /
                  employeeAttendance.length) *
                  100
              );

        return {
          employee,

          attendance:
            attendancePercentage,

          leads:
            employeeLeads.length,

          customers:
            employeeCustomers.length,

          siteVisits:
            siteVisits.length,

          bookings:
            bookings.length,

          revenue,
        };
      });

  }, [
    employees,
    attendance,
    customers,
    leads,
    search,
  ]);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Monthly Activity Dashboard
        </h1>

        <input
          className="rounded-lg border px-4 py-2"
          placeholder="Search employee..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <MonthlyActivity report={report} />

    </div>
  );
}