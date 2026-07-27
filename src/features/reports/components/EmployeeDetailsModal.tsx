interface Props {
  employee: any;
  customers: any[];
  onClose: () => void;
}

export default function EmployeeDetailsModal({
  employee,
  customers,
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
              Bookings
            </p>

            <h3 className="text-2xl font-bold">
              {
                customers.filter(
                  (c) => c.booking_amount
                ).length
              }
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
              Conversion
            </p>

            <h3 className="text-2xl font-bold">

              {customers.length === 0
                ? 0
                : (
                    (customers.filter(
                      (c) =>
                        c.booking_amount
                    ).length /
                      customers.length) *
                    100
                  ).toFixed(1)}

              %

            </h3>

          </div>

        </div>

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

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
                  {customer.customer_name}
                </td>

                <td className="p-3">
                  {customer.phone}
                </td>

                <td className="p-3">
                  {customer.status}
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