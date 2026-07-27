interface Props {
  fromDate: string;
  toDate: string;
  onFromDate: (value: string) => void;
  onToDate: (value: string) => void;
}

export default function ReportFilters({
  fromDate,
  toDate,
  onFromDate,
  onToDate,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <input
          type="date"
          value={fromDate}
          onChange={(e) =>
            onFromDate(e.target.value)
          }
          className="rounded-lg border p-2"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) =>
            onToDate(e.target.value)
          }
          className="rounded-lg border p-2"
        />

      </div>

    </div>
  );
}