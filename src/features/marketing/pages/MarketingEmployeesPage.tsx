import { useEffect, useState } from "react";
import { getMarketingEmployees } from "../services/marketing";

export default function MarketingEmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    loadEmployees();
  }, []);

 async function loadEmployees() {
  const data = await getMarketingEmployees();

  setEmployees(
    data.filter(
      (e: any) => e.status === "Active"
    )
  );
  setEmployees(
    data.filter(
      (e: any) => e.status === "Inactive"
    )
  );
}

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Marketing Employees
        </h1>

        <p className="text-slate-500">
          Active Marketing Team
        </p>
      </div>

      <div className="rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Name</th>

              <th className="p-4">Role</th>

              <th className="p-4">Phone</th>

              <th className="p-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {employees.map((emp) => (

              <tr
                key={emp.id}
                className="border-t"
              >

                <td className="p-4">
                  {emp.full_name}
                </td>

                <td className="p-4 text-center">
                  {emp.role}
                </td>

                <td className="p-4 text-center">
                  {emp.phone}
                </td>

                <td className="p-4 text-center">

                  <span className="rounded bg-green-100 px-3 py-1 text-green-700">
                    Active
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}