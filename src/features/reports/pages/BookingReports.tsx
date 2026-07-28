import { useEffect, useMemo, useState } from "react";

import BookingReportTable from "../components/BookingReportTable";

import {
  getCustomers,
  getEmployees,
} from "../services/reports";

export default function BookingReportPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [customerData, employeeData] = await Promise.all([
        getCustomers(),
        getEmployees(),
      ]);

      setCustomers(customerData);
      setEmployees(employeeData);
    } catch (err) {
      console.error(err);
    }
  }

  const report = useMemo(() => {
    return customers
      .filter((customer) => customer.booking_amount)
      .filter((customer) =>
        customer.customer_name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .map((customer) => {
        const employee = employees.find(
          (e) => Number(customer.assigned_to) === e.id
        );

        return {
          ...customer,
          employeeName: employee?.full_name ?? "-",
        };
      });
  }, [customers, employees, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Booking Report
        </h1>

        <input
          className="rounded-lg border px-4 py-2"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <BookingReportTable report={report} />
    </div>
  );
}