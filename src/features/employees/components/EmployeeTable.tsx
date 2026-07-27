import type { Employee } from "../../../services/employees";
import {
  activateEmployee,
  deactivateEmployee,
} from "../../../services/employees";

interface Props {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onRefresh: () => void;
}

export default function EmployeeTable({
  employees,
  onEdit,
  onRefresh,
}: Props) {
  async function toggleStatus(employee: Employee) {
    if (!employee.id) return;

    try {
      if (employee.is_active) {
        if (
          !window.confirm(
            "Deactivate this employee?"
          )
        )
          return;

        await deactivateEmployee(employee.id);

        alert(
          "Employee Deactivated Successfully"
        );
      } else {
        await activateEmployee(employee.id);

        alert(
          "Employee Activated Successfully"
        );
      }

      onRefresh();

    } catch (error) {
      console.error(error);

      alert("Something went wrong.");
    }
  }

  if (employees.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        No Employees Found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">
              Employee ID
            </th>

            <th className="p-4 text-left">
              Employee
            </th>

            <th className="p-4">
              Role
            </th>

            <th className="p-4">
              Personal Phone
            </th>

            <th className="p-4">
              Company Phone
            </th>

            <th className="p-4">
              Joining Date
            </th>

            <th className="p-4">
              Relieving Date
            </th>

            <th className="p-4">
              Status
            </th>

            <th className="p-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {employees.map((employee) => (

            <tr
              key={employee.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="p-4">
                {employee.employee_id ?? "-"}
              </td>

              <td className="p-4">

                <div className="font-semibold">
                  {employee.full_name}
                </div>

                <div className="text-sm text-gray-500">
                  {employee.email}
                </div>

              </td>

              <td className="p-4 text-center">
                {employee.roles?.role_name ??
                  "-"}
              </td>

              <td className="p-4 text-center">
                {employee.personal_phone}
              </td>

              <td className="p-4 text-center">
                {employee.company_phone}
              </td>

              <td className="p-4 text-center">
                {employee.joining_date ?? "-"}
              </td>

              <td className="p-4 text-center">
                {employee.relieving_date ??
                  "-"}
              </td>

              <td className="p-4 text-center">

                {employee.is_active ? (

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    Active
                  </span>

                ) : (

                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                    Inactive
                  </span>

                )}

              </td>

              <td className="p-4">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() =>
                      onEdit(employee)
                    }
                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      toggleStatus(employee)
                    }
                    className="rounded border px-3 py-1 hover:bg-slate-100"
                  >
                    {employee.is_active
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}