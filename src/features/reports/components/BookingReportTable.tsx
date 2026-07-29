interface Props {
  report: any[];
}

export default function BookingReportTable({
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
              Sales Executive
            </th>

            <th className="p-3">
              Booking Amount
            </th>

            <th className="p-3">
              Booking Date
            </th>

            <th className="p-3">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {report.map((item) => (

            <tr
              key={item.id}
              className="border-t"
            >

              <td className="p-3">
                {item.customer_name}
              </td>

              <td className="p-3">
                {item.phone}
              </td>

              <td className="p-3">
                {item.employeeName}
              </td>

              <td className="p-3 text-center font-semibold text-green-600">
                ₹
                {Number(
                  item.booking_amount
                ).toLocaleString()}
              </td>

              <td className="p-3 text-center">
  {item.registration_date ??
    item.agreement_date ??
    "-"}
</td>

              <td className="p-3 text-center">
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${
      item.payment_status === "Completed"
        ? "bg-green-100 text-green-700"
        : item.payment_status === "Partial"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {item.payment_status}
  </span>
</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}