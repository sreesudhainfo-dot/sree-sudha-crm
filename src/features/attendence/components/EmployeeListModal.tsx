interface EmployeeListModalProps {
  open: boolean;
  title: string;
  employees: {
    employee_id?: string;
    full_name?: string;
    employee_name?: string;
    status?: string;
  }[];
  onClose: () => void;
}

export default function EmployeeListModal({
  open,
  title,
  employees,
  onClose,
}: EmployeeListModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-black"
          >
            ×
          </button>

        </div>

        {/* Table */}

        <div className="max-h-[500px] overflow-y-auto">

          <table className="min-w-full">

            <thead className="sticky top-0 bg-slate-100">

              <tr>

                <th className="px-4 py-3 text-left">
                  Employee ID
                </th>

                <th className="px-4 py-3 text-left">
                  Employee Name
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {employees.length === 0 ? (

                <tr>

                  <td
                    colSpan={3}
                    className="py-8 text-center text-slate-500"
                  >
                    No records found.
                  </td>

                </tr>

              ) : (

                employees.map((emp, index) => (

                  <tr
                    key={index}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-4 py-3 font-medium">
                      {emp.employee_id}
                    </td>

                    <td className="px-4 py-3">
                      {emp.employee_name ?? emp.full_name}
                    </td>

                    <td className="px-4 py-3">
                      {emp.status ?? "-"}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}