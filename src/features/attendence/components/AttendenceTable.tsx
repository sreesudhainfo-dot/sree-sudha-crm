import type { Attendance } from "../types/Attendance";

interface AttendanceTableProps {
  attendance: Attendance[];

  onView: (attendance: Attendance) => void;

  onEdit: (attendance: Attendance) => void;

  onDelete: (id: string) => void;
}

export default function AttendanceTable({
  attendance,
  onView,
  onEdit,
  onDelete,
}: AttendanceTableProps) {

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatTime = (
    time?: string | null
  ) => {

    if (!time) return "-";

    return new Date(time).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      }
    );
  };

  return (

    <div className="overflow-hidden rounded-xl bg-white shadow">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
  Attendance Records ({attendance.length})
</h2>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                Employee
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                Date
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                Check In
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                Check Out
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                Status
              </th>

              {/* <th className="px-4 py-3 text-left text-sm font-semibold">
                Remarks
              </th> */}

              <th className="px-4 py-3 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
          {attendance.length === 0 ? (

  <tr>

    <td colSpan={7}>

  <div className="py-10 text-center">

    <h3 className="text-lg font-semibold">
      No Attendance Found
    </h3>

    <p className="mt-2 text-slate-500">
      Try changing the search or filters.
    </p>

  </div>

</td>

  </tr>

) : (

            attendance.map((record) => (

              <tr
                key={record.id}
                className="border-t hover:bg-slate-50 transition-colors"
              >

                <td className="px-4 py-3 font-medium">
                  {record.employee_name}
                </td>

                <td className="px-4 py-3">
                  {formatDate(record.attendance_date)}
                </td>

                <td className="px-4 py-3">
                  {formatTime(record.check_in)}
                </td>

                <td className="px-4 py-3">
                  {formatTime(record.check_out)}
                </td>

                <td className="px-4 py-3">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      record.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : record.status === "Leave"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {record.status}
                  </span>

                </td>

                {/* <td className="px-4 py-3 text-slate-600">
                  {record.remarks || "-"}
                </td> */}

                <td className="px-4 py-3">

                  <div className="flex justify-center gap-2">

  <button
    onClick={() => onView(record)}
    className="rounded-md bg-slate-700 px-3 py-1 text-sm text-white transition hover:bg-slate-800"
  >
    View
  </button>

  <button
    onClick={() => onEdit(record)}
    className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white transition hover:bg-blue-700"
  >
    Edit
  </button>

  <button
    onClick={() => onDelete(record.id)}
    className="rounded-md bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700"
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