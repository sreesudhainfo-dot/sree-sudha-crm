import { useEffect, useMemo, useState } from "react";

import SiteVisitReportTable from "../components/SiteVisitReportTable";

import {
  getEmployees,
  getSiteVisits,
} from "../services/reports";

export default function SiteVisitReportPage() {
  const [siteVisits, setSiteVisits] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [visitData, employeeData] =
        await Promise.all([
          getSiteVisits(),
          getEmployees(),
        ]);

      setSiteVisits(visitData);
      setEmployees(employeeData);
    } catch (err) {
      console.error(err);
    }
  }

  const report = useMemo(() => {
    return siteVisits
      .filter((visit) =>
        visit.customer_name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      )
      .map((visit) => {
        const employee = employees.find(
          (e) => e.id === Number(visit.assigned_employee)
        );

        return {
          ...visit,
          employeeName: employee?.full_name ?? "-",
        };
      });
  }, [siteVisits, employees, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Site Visit Report
        </h1>

        <input
          className="rounded-lg border px-4 py-2"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <SiteVisitReportTable report={report} />
    </div>
  );
}