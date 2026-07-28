import type { MarketingEmployee } from "../types/MarketingEmployee";

interface Props {
  employees: MarketingEmployee[];
  onEdit: (employee: MarketingEmployee) => void;
  onDelete: (id: string) => void;
}

export default function MarketingEmployeeTable({
  employees,
  onEdit,
  onDelete,
}: Props) {

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const roleColor = (role: string) => {
    switch (role) {
      case "Manager":
        return "bg-blue-100 text-blue-700";

      case "Agent":
        return "bg-green-100 text-green-700";

      case "Sub Agent":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">

      <div className="border-b px-6 py-4 flex justify-between items-center">

        <h2 className="text-lg font-semibold">
          Marketing Employees ({employees.length})
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Employee ID
              </th>

              <th className="px-4 py-3 text-left">
                Name
              </th>

              <th className="px-4 py-3 text-left">
                Role
              </th>

              <th className="px-4 py-3 text-left">
                Designation
              </th>

              <th className="px-4 py-3 text-left">
                Parent
              </th>

              <th className="px-4 py-3 text-left">
                Phone
              </th>
                <th className="px-4 py-3 text-left">
  Joining Date
</th>
              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
                        {employees.length === 0 ? (

              <tr>

                <td
                  colSpan={9}
                  className="py-12 text-center text-slate-500"
                >
                  No Employees Found
                </td>

              </tr>

            ) : (

              employees.map((emp) => (

                <tr
                  key={emp.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-4 py-3 font-medium">
                    {emp.employee_id}
                  </td>

                  <td className="px-4 py-3">
                    {emp.full_name}
                  </td>

                  <td className="px-4 py-3">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${roleColor(
                        emp.role
                      )}`}
                    >
                      {emp.role}
                    </span>

                  </td>

                  <td className="px-4 py-3">
                    {emp.designation}
                  </td>

                  <td className="px-4 py-3">

                    {employees.find(
                      (e) => e.id === emp.manager_id
                    )?.full_name ?? "-"}

                  </td>

                  <td className="px-4 py-3">
                    {emp.phone || "-"}
                  </td>
<td className="px-4 py-3">
  {formatDate(emp.joining_date)}
</td>
                  <td className="px-4 py-3">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        emp.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.status}
                    </span>

                  </td>

                  <td className="px-4 py-3">

                    <div className="flex justify-center gap-2">
                                              <button
                        onClick={() => onEdit(emp)}
                        className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(emp.id)}
                        className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
          </div>

  );
}