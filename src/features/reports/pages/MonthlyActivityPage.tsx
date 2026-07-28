import { useEffect, useMemo, useState } from "react";

import MonthlyActivity from "../components/MonthlyActivity";

import {
  getAttendance,
  getCustomers,
  getLeads,
  getEmployees,
  getSiteVisits,
} from "../services/reports";

export default function MonthlyActivityPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [siteVisits, setSiteVisits] = useState<any[]>([]);

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
        siteVisitData,
      ] = await Promise.all([
        getEmployees(),
        getAttendance(),
        getCustomers(),
        getLeads(),
        getSiteVisits(),
      ]);

      setEmployees(employeeData);
      setAttendance(attendanceData);
      setCustomers(customerData);
      setLeads(leadData);
      setSiteVisits(siteVisitData);
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
        const employeeAttendance = attendance.filter(
          (a) => Number(a.employee_id) === employee.id
        );

        const employeeLeads = leads.filter(
          (l) => Number(l.assigned_to) === employee.id
        );

        const employeeCustomers = customers.filter(
          (c) => Number(c.assigned_to) === employee.id
        );

        const employeeSiteVisits = siteVisits.filter(
          (v) => Number(v.assigned_to) === employee.id
        );

        const bookings = employeeCustomers.filter(
          (c) => Number(c.booking_amount ?? 0) > 0
        );

        const revenue = bookings.reduce(
          (sum, customer) =>
            sum + Number(customer.booking_amount ?? 0),
          0
        );

        const presentDays = employeeAttendance.filter(
          (a) => a.status === "Present"
        ).length;

        const attendancePercentage =
          employeeAttendance.length === 0
            ? 0
            : Math.round(
                (presentDays / employeeAttendance.length) *
                  100
              );

        return {
          employee,

          attendance: attendancePercentage,

          leads: employeeLeads.length,

          customers: employeeCustomers.length,

          siteVisits: employeeSiteVisits.length,

          bookings: bookings.length,

          revenue,
        };
      });
  }, [
    employees,
    attendance,
    customers,
    leads,
    siteVisits,
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
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <MonthlyActivity report={report} />
    </div>
  );
}