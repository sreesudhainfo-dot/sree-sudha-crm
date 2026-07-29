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

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-5 py-2 text-white"
          >
            Close
          </button>

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