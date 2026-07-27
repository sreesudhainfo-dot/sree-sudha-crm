import ReportMenu from "../components/ReportMenu";

export default function ReportsDashboard() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Reports Center
        </h1>

        <p className="mt-2 text-slate-500">
          View every business report from one place.
        </p>

      </div>

      <ReportMenu />

    </div>
  );
}