interface Props {
  report: any[];
}

export default function MonthlyActivity({
  report,
}: Props) {

  const totalEmployees = report.length;

  const totalLeads = report.reduce(
    (sum, item) => sum + item.leads,
    0
  );

  const totalCustomers = report.reduce(
    (sum, item) => sum + item.customers,
    0
  );

  const totalVisits = report.reduce(
    (sum, item) => sum + item.siteVisits,
    0
  );

  const totalBookings = report.reduce(
    (sum, item) => sum + item.bookings,
    0
  );

  const totalRevenue = report.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const averageAttendance =
    report.length === 0
      ? 0
      : Math.round(
          report.reduce(
            (sum, item) =>
              sum + item.attendance,
            0
          ) / report.length
        );

  return (
    <div className="space-y-6">

      {/* KPI Cards */}

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-6">

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Employees
          </p>
          <h2 className="mt-2 text-3xl font-bold">
            {totalEmployees}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Attendance
          </p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {averageAttendance}%
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Leads
          </p>
          <h2 className="mt-2 text-3xl font-bold">
            {totalLeads}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Customers
          </p>
          <h2 className="mt-2 text-3xl font-bold">
            {totalCustomers}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Site Visits
          </p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {totalVisits}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Revenue
          </p>
          <h2 className="mt-2 text-2xl font-bold text-green-600">
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Activity Table */}

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
                Attendance
              </th>

              <th className="p-3">
                Leads
              </th>

              <th className="p-3">
                Customers
              </th>

              <th className="p-3">
                Site Visits
              </th>

              <th className="p-3">
                Bookings
              </th>

              <th className="p-3">
                Revenue
              </th>

            </tr>

          </thead>

          <tbody>

            {report.map((item) => (

              <tr
                key={item.employee.id}
                className="border-t"
              >

                <td className="p-3">
                  {item.employee.full_name}
                </td>

                <td className="p-3 text-center">
                  {item.employee.role}
                </td>

                <td className="p-3 text-center">
                  {item.attendance}%
                </td>

                <td className="p-3 text-center">
                  {item.leads}
                </td>

                <td className="p-3 text-center">
                  {item.customers}
                </td>

                <td className="p-3 text-center">
                  {item.siteVisits}
                </td>

                <td className="p-3 text-center font-semibold">
                  {item.bookings}
                </td>

                <td className="p-3 text-center font-semibold text-green-600">
                  ₹{item.revenue.toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

          <tfoot className="bg-slate-50 font-bold">

            <tr>

              <td className="p-3">
                TOTAL
              </td>

              <td></td>

              <td className="text-center">
                {averageAttendance}%
              </td>

              <td className="text-center">
                {totalLeads}
              </td>

              <td className="text-center">
                {totalCustomers}
              </td>

              <td className="text-center">
                {totalVisits}
              </td>

              <td className="text-center">
                {totalBookings}
              </td>

              <td className="text-center text-green-600">
                ₹{totalRevenue.toLocaleString()}
              </td>

            </tr>

          </tfoot>

        </table>

      </div>

    </div>
  );
}