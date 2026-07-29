interface Props {
  report: any[];
}

export default function CustomerAssignmentTable({
  report,
}: Props) {

  return (

    <div className="overflow-hidden rounded-xl bg-white shadow">

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
              Assigned Employee
            </th>

            <th className="p-3">
              Role
            </th>

            <th className="p-3">
              Status
            </th>

            <th className="p-3">
              Booking
            </th>

          </tr>

        </thead>

        <tbody>

          {report.map((customer) => (

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
                {customer.employeeName}
              </td>

              <td className="p-3 text-center">
                {customer.role}
              </td>

              <td className="p-3 text-center">
                {customer.payment_status}
              </td>

              <td className="p-3 text-center">
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

  );

}