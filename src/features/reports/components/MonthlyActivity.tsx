interface Props {
  report: any[];
}

export default function MonthlyActivity({
  report,
}: Props) {

  /* =========================================
   MONTHLY TOTALS
========================================= */

const totalEmployees = report.length;
console.log(report[0].employee);
const monthlyPresentDays = report.reduce(
  (sum, item) => sum + item.presentDays,
  0
);

// const monthlyAttendancePercentage =
//   report.length === 0
//     ? 0
//     : Math.round(
//         report.reduce(
//           (sum, item) => sum + item.attendance,
//           0
//         ) / report.length
//       );

const monthlyLeads = report.reduce(
  (sum, item) => sum + item.leads,
  0
);

const monthlyCustomers = report.reduce(
  (sum, item) => sum + item.customers,
  0
);

const monthlySiteVisits = report.reduce(
  (sum, item) => sum + item.siteVisits,
  0
);

const monthlyBookings = report.reduce(
  (sum, item) => sum + item.bookings,
  0
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
            {monthlyPresentDays} Days
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Leads
          </p>
          <h2 className="mt-2 text-3xl font-bold">
            {monthlyLeads}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Customers
          </p>
          <h2 className="mt-2 text-3xl font-bold">
            {monthlyCustomers}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Site Visits
          </p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {monthlySiteVisits}
          </h2>
        </div>

        {/* <div className="rounded-xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Revenue
          </p>
          <h2 className="mt-2 text-2xl font-bold text-green-600">
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div> */}

      </div>

      {/* Activity Table */}

      <div className="overflow-hidden rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-3 text-left">
                Employee
              </th>

              {/* <th className="p-3">
                Role
              </th> */}

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

              {/* <th className="p-3">
                Revenue
              </th> */}

            </tr>

          </thead>

          <tbody>
  {report.map((item) => {

   console.log("Report:", report);

    return (
      <tr
        key={item.employee.id}
        className="border-t"
      >
        <td className="p-3">
          <div className="font-semibold">
            {item.employee.full_name}
          </div>
        </td>

        {/* Rest of your columns */}

      </tr>
    );
  })}
</tbody>

          <tfoot className="bg-slate-50 font-bold">

            <tr>

              <td className="p-3">
                TOTAL
              </td>

              {/* <td></td> */}

              <td className="text-center">
                {monthlyPresentDays} Days
              </td>

              <td className="text-center">
                {monthlyLeads}
              </td>

              <td className="text-center">
                {monthlyCustomers}
              </td>

              <td className="text-center">
                {monthlySiteVisits}
              </td>

              <td className="text-center">
                {monthlyBookings}
              </td>

              {/* <td className="text-center text-green-600">
                ₹{totalRevenue.toLocaleString()}
              </td> */}

            </tr>

          </tfoot>

        </table>

      </div>

    </div>
  );
}