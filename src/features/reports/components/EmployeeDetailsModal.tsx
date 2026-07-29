import * as XLSX from "xlsx";

interface Props {
  employee: any;
  attendance: any[];
  leads: any[];
  customers: any[];
  onClose: () => void;
}

export default function EmployeeDetailsModal({
  employee,
  attendance,
  leads,
  customers = [],
  onClose,
}: Props) {
  if (!employee) return null;

  const totalRevenue = customers.reduce(
    (sum, customer) =>
      sum +
      Number(customer.booking_amount ?? 0),
    0
  );
function handleDownload() {
  if (!employee) return;

  const rows: any[][] = [];

  // ===== Title =====
  rows.push([employee.full_name]);
  rows.push([]);

  // ===== Summary =====
  rows.push(["Customers", customers.length]);
  rows.push([
    "Attendance",
    attendance.filter((a) => a.status === "Present").length,
  ]);
  rows.push(["Revenue", `₹${totalRevenue.toLocaleString()}`]);
  rows.push(["Leads", leads.length]);

  rows.push([]);
  rows.push(["LEADS"]);
  rows.push([]);

  // Lead headers
  rows.push([
    "Date",
    "Lead ID",
    "Customer",
    "Phone",
    "Source",
    "Status",
  ]);

  // Lead rows
  leads.forEach((lead: any) => {
    rows.push([
      lead.site_visit_date
        ? new Date(lead.site_visit_date).toLocaleDateString("en-GB")
        : "-",
      lead.lead_id,
      lead.customer_name,
      lead.phone,
      lead.source,
      lead.status,
    ]);
  });

  rows.push([]);
  rows.push(["CUSTOMERS"]);
  rows.push([]);

  // Customer headers
  rows.push([
    "Date",
    "Customer",
    "Phone",
    "Status",
    "Booking",
    "Amount",
  ]);

  // Customer rows
  customers.forEach((customer: any) => {
    rows.push([
      customer.registration_date
        ? new Date(customer.registration_date).toLocaleDateString("en-GB")
        : "-",
      customer.customer_name,
      customer.phone,
      customer.payment_status,
      customer.booking_amount ? "Booked" : "-",
      customer.booking_amount
        ? `₹${Number(customer.booking_amount).toLocaleString()}`
        : "-",
    ]);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Employee Report"
  );

  XLSX.writeFile(
    workbook,
    `${employee.full_name}_Report.xlsx`
  );
}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="max-h-[90vh] w-[1200px] overflow-auto rounded-xl bg-white p-6">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold">
              {employee.full_name}
            </h2>

            <p className="text-slate-500">
              {employee.role}
            </p>

          </div>

          <div className="flex justify-end gap-3 mt-6">

  <button
    onClick={handleDownload}
    className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
  >
    Download Report
  </button>

  <button
    onClick={onClose}
    className="rounded-lg border px-5 py-2"
  >
    Close
  </button>

</div>

        </div>

        <div className="mb-6 grid grid-cols-4 gap-4">

          <div className="rounded-lg bg-slate-100 p-4">

            <p className="text-sm text-slate-500">
              Customers
            </p>

            <h3 className="text-2xl font-bold">
              {customers.length}
            </h3>

          </div>

          <div className="rounded-lg bg-slate-100 p-4">

            <p className="text-sm text-slate-500">
              Attendance
            </p>

            <h3 className="text-2xl font-bold">
              {attendance.filter(a => a.status === "Present").length}
            </h3>

          </div>

          <div className="rounded-lg bg-slate-100 p-4">

            <p className="text-sm text-slate-500">
              Revenue
            </p>

            <h3 className="text-2xl font-bold">
              ₹
              {totalRevenue.toLocaleString()}
            </h3>

          </div>

          <div className="rounded-lg bg-slate-100 p-4">

            <p className="text-sm text-slate-500">
              Leads
            </p>

            <h3 className="text-2xl font-bold">

              {leads.length}

            </h3>

          </div>

        </div>
<h3 className="mb-3 text-xl font-bold">
  Leads
</h3>

<table className="mb-8 min-w-full">
  <thead className="bg-slate-100">
    <tr>
      <th className="p-3 text-left">Date</th>
      <th className="p-3 text-left">Lead ID</th>
      <th className="p-3 text-left">Customer</th>
      <th className="p-3">Phone</th>
      <th className="p-3">Source</th>
      <th className="p-3">Status</th>
    </tr>
  </thead>

  <tbody>
    {leads.map((lead: any) => (
      <tr key={lead.id} className="border-t">
        <td className="p-3">
  {lead.site_visit_date
    ? new Date(lead.site_visit_date).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "-"}
</td>
        <td className="p-3">{lead.lead_id}</td>
        <td className="p-3">{lead.customer_name}</td>
        <td className="p-3">{lead.phone}</td>
        <td className="p-3">{lead.source}</td>
        <td className="p-3">{lead.status}</td>
      </tr>
    ))}

    {leads.length === 0 && (
      <tr>
        <td
          colSpan={5}
          className="p-4 text-center text-slate-500"
        >
          No leads found
        </td>
      </tr>
    )}
  </tbody>
</table>

<h3 className="mb-3 text-xl font-bold">
  Customers
</h3>
        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>
<th className="p-3 text-left">
                Date
              </th>
              <th className="p-3 text-left">
                Customer
              </th>

              <th className="p-3">
                Phone
              </th>

              <th className="p-3">
                Status
              </th>

              <th className="p-3">
                Booking
              </th>

              <th className="p-3">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {customers.map((customer) => (

              <tr
                key={customer.id}
                className="border-t"
              >
<td className="p-3">
  {customer.registration_date
    ? new Date(customer.registration_date).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "-"}
</td>
                <td className="p-3">
                  {customer.customer_name}
                </td>

                <td className="p-3">
                  {customer.phone}
                </td>

                <td className="p-3">
                  {customer.payment_status}
                </td>

                <td className="p-3">

                  {customer.booking_amount
                    ? "✅ Booked"
                    : "—"}

                </td>

                <td className="p-3">

                  {customer.booking_amount
                    ? `₹${Number(
                        customer.booking_amount
                      ).toLocaleString()}`
                    : "-"}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}