import { Link } from "react-router-dom";

const reports = [
  {
    title: "Employee Performance",
    path: "/reports/employee-performance",
    color: "bg-blue-600",
  },
  {
    title: "Attendance Report",
    path: "/reports/attendance",
    color: "bg-green-600",
  },
  {
    title: "Customer Assignment",
    path: "/reports/customer-assignment",
    color: "bg-purple-600",
  },
  {
    title: "Site Visit Report",
    path: "/reports/site-visits",
    color: "bg-orange-600",
  },
  {
    title: "Booking Report",
    path: "/reports/bookings",
    color: "bg-pink-600",
  },
  // {
  //   title: "Revenue Report",
  //   path: "/reports/revenue",
  //   color: "bg-emerald-600",
  // },
  // {
  //   title: "Monthly Activity",
  //   path: "/reports/monthly-activity",
  //   color: "bg-slate-700",
  // },
];

export default function ReportMenu() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {reports.map((report) => (
        <Link
          key={report.title}
          to={report.path}
          className={`${report.color} rounded-xl p-6 text-white shadow`}
        >
          <h2 className="text-xl font-semibold">
            {report.title}
          </h2>

          <p className="mt-2 text-sm">
            Open Report →
          </p>
        </Link>
      ))}
    </div>
  );
}