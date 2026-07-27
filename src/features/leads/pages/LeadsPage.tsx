import { useState } from "react";
import LeadForm from "../components/LeadForm";
import LeadTable from "../components/LeadTable";
import type { Lead } from "../types/Lead";

export default function LeadsPage() {
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setEditingLead(null);
    setRefreshKey((prev) => prev + 1);
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancel = () => {
    setEditingLead(null);
  };

  return (
    <div className="space-y-6 p-6">

      <div>
        <h1 className="text-3xl font-bold">Lead Management</h1>
        <p className="text-gray-500">
          Manage customer enquiries and sales pipeline.
        </p>
      </div>

      <LeadForm
        editingLead={editingLead}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />

      <LeadTable
        key={refreshKey}
        onEdit={handleEdit}
      />

    </div>
  );
}