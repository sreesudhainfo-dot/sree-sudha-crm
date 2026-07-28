import { useEffect, useMemo, useState } from "react";

import { getLeads, deleteLead } from "../services/leads";
import type { Lead } from "../types/Lead";

interface LeadTableProps {
  onEdit: (lead: Lead) => void;
  
}

export default function LeadTable({ onEdit }: LeadTableProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  async function loadLeads() {
    try {
      setLoading(true);
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  async function handleDelete(id: string) {
    const ok = window.confirm("Delete this lead?");
    if (!ok) return;

    await deleteLead(id);
    loadLeads();
  }

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search) ||
        lead.lead_id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  if (loading) {
    return <p>Loading leads...</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-5">

      <div className="flex gap-3 mb-4">

        <input
          placeholder="Search Lead..."
          className="border rounded p-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded p-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Interested</option>
          <option>Site Visit Scheduled</option>
          <option>Visited</option>
          <option>Booked</option>
          <option>Closed</option>
          <option>Lost</option>
        </select>

      </div>

      <table className="w-full border-collapse">

        <thead>

          <tr className="border-b bg-gray-50">

            <th className="text-left p-3">Lead ID</th>

            <th className="text-left p-3">Customer</th>

            <th className="text-left p-3">Phone</th>

            <th className="text-left p-3">Source</th>

            <th className="text-left p-3">Project</th>
<th className="text-left p-3">
  Assigned Employee
</th>
            <th className="text-left p-3">Status</th>

            <th className="text-left p-3">Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredLeads.map((lead) => (

            <tr key={lead.id} className="border-b">

              <td className="p-3">{lead.lead_id}</td>

              <td className="p-3">{lead.customer_name}</td>

              <td className="p-3">{lead.phone}</td>

              <td className="p-3">{lead.source}</td>

              <td className="p-3">{lead.project}</td>
<td className="p-3">
  {lead.assigned_employee_name ?? "-"}
</td>
              <td className="p-3">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-sm">
                  {lead.status}
                </span>
              </td>

              <td className="p-3 flex gap-2">

                <button
                  className="text-blue-600"
                  onClick={() => onEdit(lead)}
                >
                  Edit
                </button>

                <button
                  className="text-red-600"
                  onClick={() => handleDelete(lead.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

          {filteredLeads.length === 0 && (

            <tr>

              <td
                colSpan={7}
                className="text-center p-5 text-gray-500"
              >
                No Leads Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}