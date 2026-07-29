import { useState } from "react";

import EmployeeDetailsModal from "./EmployeeDetailsModal";

interface Props {
  report: any[];
}

export default function EmployeePerformanceTable({
  report,
}: Props) {
  const [selectedEmployee, setSelectedEmployee] =
    useState<any>(null);

  return (
    <>
      <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-3 text-left">
                Employee
              </th>

              <th className="p-3">
                Role
              </th>

              <th className="p-3">
                Attendance
              </th>

              <th className="p-3">
                Leads
              </th>

              <th className="p-3">
                Customers
              </th>

              <th className="p-3">
                Bookings
              </th>

              {/* <th className="p-3">
                Revenue
              </th> */}

              <th className="p-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {report.map((row) => (

              <tr
                key={row.employee.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-3 font-medium">
                  {row.employee.full_name}
                </td>

                <td className="p-3 text-center">
  {row.employee.roles?.role_name ?? "-"}
</td>

                <td className="p-3 text-center">
                  {row.attendance}
                </td>

                <td className="p-3 text-center">
                  {row.leads}
                </td>

                <td className="p-3 text-center">
                  {row.customers}
                </td>

                <td className="p-3 text-center">
                  {row.bookings}
                </td>

                {/* <td className="p-3 text-center">
                  ₹{(row.revenue ?? 0).toLocaleString()}
                </td> */}

                <td className="p-3 text-center">

                  <button
                    onClick={() =>
                      setSelectedEmployee(row)
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {selectedEmployee && (
        <EmployeeDetailsModal
  employee={selectedEmployee.employee}
  attendance={selectedEmployee.attendanceList}
  leads={selectedEmployee.leadList}
  customers={selectedEmployee.customerList}
  onClose={() => setSelectedEmployee(null)}
/>
      )}
    </>
  );
}