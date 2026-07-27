interface Props {
  report: any[];
}

export default function SiteVisitReportTable({
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
              Employee
            </th>

            <th className="p-3">
              Site Visit
            </th>

            <th className="p-3">
              Status
            </th>

            <th className="p-3">
              Remarks
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

              <td className="p-3">
                {item.site_visit_date}
              </td>

              <td className="p-3 text-center">
                {item.status}
              </td>

              <td className="p-3">
                {item.remarks ?? "-"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}