import { useEffect, useMemo, useState } from "react";

import EmployeePerformanceTable from "../components/EmployeePerformanceTable";

import { getEmployeePerformance } from "../services/reports";

export default function EmployeePerformancePage() {
  const [report, setReport] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const data =
        await getEmployeePerformance();

      setReport(data);

    } catch (err) {
      console.error(err);
    }
  }

  const filteredReport = useMemo(() => {
    return report.filter((row) =>
      row.employee.full_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [report, search]);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Employee Performance
        </h1>

        <input
          className="rounded-lg border px-4 py-2"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <EmployeePerformanceTable
        report={filteredReport}
      />

    </div>
  );
}