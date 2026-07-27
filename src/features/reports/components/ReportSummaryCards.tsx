interface Props {
  title: string;
  value: number | string;
}

export default function ReportSummaryCards({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <p className="text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        {value}
      </h2>

    </div>
  );
}