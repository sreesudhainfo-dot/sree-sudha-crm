import type { Attendance } from "../types/Attendance";
import { exportEmployeeAttendance } from "../../../utils/exportEmployeeAttendance";
interface Props {
  open: boolean;
  employeeId: string;
  employeeName: string;
  attendance: Attendance[];
  onClose: () => void;
}

export default function EmployeeAttendanceModal({
  open,
  employeeId,
  employeeName,
  attendance,
  onClose,
}: Props) {
  if (!open) return null;

  const total = attendance.length;

  const present = attendance.filter(
    (a) => a.status === "Present"
  ).length;

  const leave = attendance.filter(
    (a) => a.status === "Leave"
  ).length;

//   const halfDay = attendance.filter(
//     (a) => a.status === "Half Day"
//   ).length;

  const percentage =
    total === 0
      ? 0
      : ((present / total) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-5xl rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b px-6 py-4">

          <div>

            <h2 className="text-2xl font-bold">
              Employee Attendance
            </h2>

            <p className="text-slate-500">
              {employeeName}
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl text-slate-500 hover:text-black"
          >
            ×
          </button>

        </div>

        <div className="grid grid-cols-4 gap-4 p-6">

          <div className="rounded-xl bg-slate-100 p-5">

            <p className="text-sm text-slate-500">
              Employee ID
            </p>

            <h3 className="mt-2 text-xl font-bold">
              {employeeId}
            </h3>

          </div>

          <div className="rounded-xl bg-green-50 p-5">

            <p className="text-sm text-slate-500">
              Present
            </p>

            <h3 className="mt-2 text-3xl font-bold text-green-700">
              {present}
            </h3>

          </div>

          <div className="rounded-xl bg-red-50 p-5">

            <p className="text-sm text-slate-500">
              Leave
            </p>

            <h3 className="mt-2 text-3xl font-bold text-red-700">
              {leave}
            </h3>

          </div>

          <div className="rounded-xl bg-blue-50 p-5">

            <p className="text-sm text-slate-500">
              Attendance %
            </p>

            <h3 className="mt-2 text-3xl font-bold text-blue-700">
              {percentage}%
            </h3>

          </div>

        </div>

        <div className="max-h-[450px] overflow-y-auto px-6 pb-6">

          <table className="min-w-full">

            <thead className="sticky top-0 bg-slate-100">

              <tr>

                <th className="px-4 py-3 text-left">
                  Date
                </th>

                <th className="px-4 py-3 text-left">
                  Check In
                </th>

                <th className="px-4 py-3 text-left">
                  Check Out
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>

              </tr>

            </thead>

            

              <tbody>

  {[...attendance]
    .sort(
      (a, b) =>
        new Date(b.attendance_date).getTime() -
        new Date(a.attendance_date).getTime()
    )
    .map((record) => (

      <tr
        key={record.id}
      
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-4 py-3">
                    {record.attendance_date}
                  </td>

                  <td className="px-4 py-3">

                    {record.check_in
                      ? new Date(
                          record.check_in
                        ).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "-"}

                  </td>

                  <td className="px-4 py-3">

                    {record.check_out
                      ? new Date(
                          record.check_out
                        ).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "-"}

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

                </tr>

              ))}

            </tbody>

         </table>

</div>

<div className="border-t px-6 py-5">

  <button
    onClick={() =>
      exportEmployeeAttendance(
        employeeName,
        attendance
      )
    }
    className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700"
  >
    📥 Export Employee Excel
  </button>

</div>



      </div>

    </div>
  );
}