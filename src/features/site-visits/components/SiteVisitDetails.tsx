import type { SiteVisit } from "../types/SiteVisit";

interface SiteVisitDetailsProps {
  visit: SiteVisit | null;
  onClose: () => void;
}

export default function SiteVisitDetails({
  visit,
  onClose,
}: SiteVisitDetailsProps) {
  if (!visit) return null;

  const statusColor = {
    Scheduled: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
    Rescheduled: "bg-yellow-100 text-yellow-700",
  }[visit.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-xl font-bold">
            Site Visit Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600"
          >
            ✕
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6 p-6">

          <div>
            <p className="text-sm text-gray-500">Visit ID</p>
            <p className="font-semibold">{visit.visit_id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>

            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusColor}`}
            >
              {visit.status}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-semibold">{visit.customer_name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p>{visit.phone}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Project</p>
            <p>{visit.project}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Assigned Employee</p>
            <p>{visit.assigned_employee}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Visit Date</p>
            <p>{visit.visit_date}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Visit Time</p>
            <p>{visit.visit_time}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Vehicle</p>
            <p>{visit.vehicle || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Pickup Location</p>
            <p>{visit.pickup_location || "-"}</p>
          </div>

        </div>

        <div className="border-t px-6 py-5">

          <div>

            <p className="mb-2 text-sm text-gray-500">
              Remarks
            </p>

            <div className="min-h-[100px] rounded-lg border bg-gray-50 p-4">
              {visit.remarks || "No remarks available."}
            </div>

          </div>

        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-lg bg-gray-700 px-6 py-2 text-white hover:bg-gray-800"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}