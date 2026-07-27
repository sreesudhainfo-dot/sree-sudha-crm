import { useState } from "react";

import SiteVisitForm from "../components/SiteVisitForm";
import SiteVisitTable from "../components/SiteVisitTable";
import SiteVisitDetails from "../components/SiteVisitDetails";

import type { SiteVisit } from "../types/SiteVisit";

export default function SiteVisitsPage() {
  const [editingVisit, setEditingVisit] = useState<SiteVisit | null>(null);

  const [selectedVisit, setSelectedVisit] =
    useState<SiteVisit | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  function refreshTable() {
    setRefreshKey((prev) => prev + 1);
    setEditingVisit(null);
  }

  return (
    <div className="space-y-6">

      <SiteVisitForm
        editingVisit={editingVisit}
        onSuccess={refreshTable}
        onCancel={() => setEditingVisit(null)}
      />

      <SiteVisitTable
        key={refreshKey}
        onEdit={setEditingVisit}
        onView={setSelectedVisit}
      />

      <SiteVisitDetails
        visit={selectedVisit}
        onClose={() => setSelectedVisit(null)}
      />

    </div>
  );
}