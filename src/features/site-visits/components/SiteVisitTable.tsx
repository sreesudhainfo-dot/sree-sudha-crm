import { useEffect, useMemo, useState } from "react";

import type {
  SiteVisit,
  VisitStatus,
} from "../types/SiteVisit";

import {
  siteVisitService,
  getSiteVisits,
  completeVisit,
  cancelVisit,
} from "../services/siteVisits";

import SearchInput from "../../../components/common/SearchInput";
import FilterSelect from "../../../components/common/FilterSelect";
interface Props {
  onEdit: (visit: SiteVisit) => void;
  onView: (visit: SiteVisit) => void;
}

export default function SiteVisitTable({
  onEdit,
  onView,
}: Props) {
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  async function loadVisits() {
    try {
      setLoading(true);

      const data = await getSiteVisits();

      setVisits(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVisits();
  }, []);

  async function handleDelete(id: string) {
    const ok = window.confirm(
      "Are you sure you want to delete this visit?"
    );

    if (!ok) return;

    try {
      await siteVisitService.delete(id);

      loadVisits();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleComplete(id: string) {
    try {
      await completeVisit(id);

      loadVisits();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCancel(id: string) {
    try {
      await cancelVisit(id);

      loadVisits();
    } catch (error) {
      console.error(error);
    }
  }

  const filteredVisits = useMemo(() => {
    return visits.filter((visit) => {
      const matchesSearch =
        visit.customer_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        visit.phone.includes(search) ||
        visit.visit_id
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        visit.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [visits, search, statusFilter]);

  function getStatusClass(
    status: VisitStatus
  ): string {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Rescheduled":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        Loading site visits...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold">
          Site Visits
        </h2>

        <div className="flex gap-3">

          <SearchInput
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search..."
          />

          <FilterSelect
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            options={[
              "All",
              "Scheduled",
              "Completed",
              "Cancelled",
              "Rescheduled",
            ]}
          />

        </div>

      </div>
            <div className="overflow-x-auto">

        <table className="min-w-full border border-gray-200">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Visit ID
              </th>

              <th className="px-4 py-3 text-left">
                Customer
              </th>

              <th className="px-4 py-3 text-left">
                Phone
              </th>

              <th className="px-4 py-3 text-left">
                Project
              </th>

              <th className="px-4 py-3 text-left">
                Employee
              </th>

              <th className="px-4 py-3 text-left">
                Visit Date
              </th>

              <th className="px-4 py-3 text-left">
                Time
              </th>

              <th className="px-4 py-3 text-center">
                Status
              </th>

              <th className="px-4 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredVisits.length === 0 && (

              <tr>

                <td
                  colSpan={9}
                  className="text-center py-8 text-gray-500"
                >
                  No Site Visits Found
                </td>

              </tr>

            )}

            {filteredVisits.map((visit) => (

              <tr
                key={visit.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-4 py-3">
                  {visit.visit_id}
                </td>

                <td className="px-4 py-3 font-medium">
                  {visit.customer_name}
                </td>

                <td className="px-4 py-3">
                  {visit.phone}
                </td>

                <td className="px-4 py-3">
                  {visit.project}
                </td>

                <td className="px-4 py-3">
                  {(visit as any).employeeName}
                </td>

                <td className="p-3">
  {visit.visit_date
    ? new Date(visit.visit_date).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "-"}
</td>

                <td className="px-4 py-3">
                  {visit.visit_time}
                </td>

                <td className="px-4 py-3 text-center">

                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                      visit.status
                    )}`}
                  >
                    {visit.status}
                  </span>

                </td>

                <td className="px-4 py-3">

                  <div className="flex flex-wrap gap-2 justify-center">

                    <button
                      onClick={() => onView(visit)}
                      className="px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600"
                    >
                      View
                    </button>

                    <button
                      onClick={() => onEdit(visit)}
                      className="px-3 py-1 rounded bg-amber-500 text-white hover:bg-amber-600"
                    >
                      Edit
                    </button>

                    {visit.status !== "Completed" && (

                      <button
                        onClick={() =>
                          handleComplete(visit.id)
                        }
                        className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                      >
                        Complete
                      </button>

                    )}

                    {visit.status !== "Cancelled" && (

                      <button
                        onClick={() =>
                          handleCancel(visit.id)
                        }
                        className="px-3 py-1 rounded bg-orange-500 text-white hover:bg-orange-600"
                      >
                        Cancel
                      </button>

                    )}

                    <button
                      onClick={() =>
                        handleDelete(visit.id)
                      }
                      className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
          </div>
  );
}