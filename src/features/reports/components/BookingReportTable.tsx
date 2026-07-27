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
                {item.conversion_date ??
                  "-"}
              </td>

              <td className="p-3 text-center">
                {item.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}