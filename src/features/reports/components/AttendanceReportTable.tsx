interface Props {
  report: any[];
}

export default function AttendanceReportTable({
  report,
}: Props) {

  return (

    <div className="overflow-hidden rounded-xl bg-white shadow">

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
              Present
            </th>

            <th className="p-3">
              Absent
            </th>

            <th className="p-3">
              Leave
            </th>

            <th className="p-3">
              Late
            </th>

            <th className="p-3">
              Attendance %
            </th>

          </tr>

        </thead>

        <tbody>

          {report.map((row) => (

            <tr
              key={row.employee.id}
              className="border-t"
            >

              <td className="p-3">
                {row.employee.full_name}
              </td>

              <td className="p-3 text-center">
                {row.employee.role}
              </td>

              <td className="p-3 text-center text-green-600">
                {row.present}
              </td>

              <td className="p-3 text-center text-red-600">
                {row.absent}
              </td>

              <td className="p-3 text-center">
                {row.leave}
              </td>

              <td className="p-3 text-center text-orange-500">
                {row.late}
              </td>

              <td className="p-3 text-center font-semibold">

                {row.percentage}%

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}