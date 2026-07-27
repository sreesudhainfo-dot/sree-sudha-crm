import { useEffect, useState } from "react";
import type { Lead, LeadSource, LeadStatus } from "../types/Lead";
import { createLead, updateLead } from "../services/leads";

import SearchSelect from "../../../components/common/SearchSelect";
import { getEmployees } from "../../../services/employees";
interface LeadFormProps {
  editingLead?: Lead | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

const sources: LeadSource[] = [
  "Facebook",
  "Instagram",
  "Google",
  "Website",
  "Walk-in",
  "Reference",
  "JustDial",
  "WhatsApp",
  "Hoarding",
  "Other",
];

const statuses: LeadStatus[] = [
  "New",
  "Contacted",
  "Interested",
  "Site Visit Scheduled",
  "Visited",
  "Booked",
  "Closed",
  "Lost",
];

const initialState = {
  customer_name: "",
  phone: "",
  alternate_phone: "",
  email: "",
  source: "Website" as LeadSource,
  project: "",
  budget: "",
  location: "",
  assigned_to: "",
  assigned_employee_name: "",
  status: "New" as LeadStatus,
  site_visit_date: "",
  remarks: "",
};

export default function LeadForm({
  editingLead,
  onSuccess,
  onCancel,
}: LeadFormProps) {
  const [employees, setEmployees] = useState<any[]>([]);

  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);
useEffect(() => {
  loadEmployees();
}, []);

async function loadEmployees() {
  const data = await getEmployees();
  setEmployees(data);
}
  useEffect(() => {
    if (!editingLead) {
      setForm(initialState);
      return;
    }

    setForm({
      customer_name: editingLead.customer_name,
      phone: editingLead.phone,
      alternate_phone: editingLead.alternate_phone ?? "",
      email: editingLead.email ?? "",
      source: editingLead.source,
      project: editingLead.project,
      budget: editingLead.budget?.toString() ?? "",
      location: editingLead.location ?? "",
      assigned_to: editingLead.assigned_to ?? "",
      assigned_employee_name:
        editingLead.assigned_employee_name ?? "",
      status: editingLead.status,
      site_visit_date: editingLead.site_visit_date ?? "",
      remarks: editingLead.remarks ?? "",
    });
  }, [editingLead]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSaving(true);

    try {
      if (editingLead) {
        await updateLead(editingLead.id, {
          ...form,
          budget: form.budget ? Number(form.budget) : undefined,
        });
      } else {
        await createLead({
          lead_id: `LD-${Date.now()}`,
          customer_name: form.customer_name,
          phone: form.phone,
          alternate_phone: form.alternate_phone || undefined,
          email: form.email || undefined,
          source: form.source,
          project: form.project,
          budget: form.budget ? Number(form.budget) : undefined,
          location: form.location || undefined,
          assigned_to: form.assigned_to || undefined,
          assigned_employee_name:
            form.assigned_employee_name || undefined,
          status: form.status,
          site_visit_date:
            form.site_visit_date || undefined,
          remarks: form.remarks || undefined,
          booking_amount: undefined,
          conversion_date: undefined,
        });
      }

      setForm(initialState);
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to save lead.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-6 bg-white">
      <h2 className="text-xl font-semibold">
        {editingLead ? "Edit Lead" : "Add New Lead"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="customer_name"
          placeholder="Customer Name"
          value={form.customer_name}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />

        <input
          name="alternate_phone"
          placeholder="Alternate Phone"
          value={form.alternate_phone}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <select
          name="source"
          value={form.source}
          onChange={handleChange}
          className="border rounded p-2"
        >
          {sources.map((source) => (
            <option key={source}>{source}</option>
          ))}
        </select>
<SearchSelect
  label="Assigned Employee"
  placeholder="Search employee..."
  value={form.assigned_to}
  onChange={(value) =>
    setForm((prev) => ({
      ...prev,
      assigned_to: value,
    }))
  }
  options={employees.map((emp) => ({
    id: emp.id,
    label: emp.full_name,
    subLabel: emp.employee_id,
  }))}
/>
        <input
          name="project"
          placeholder="Project"
          value={form.project}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />

        <input
          name="budget"
          type="number"
          placeholder="Budget"
          value={form.budget}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          name="location"
          placeholder="Preferred Location"
          value={form.location}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border rounded p-2"
        >
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>

        <input
          type="date"
          name="site_visit_date"
          value={form.site_visit_date}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>

      <textarea
        name="remarks"
        rows={4}
        placeholder="Remarks"
        value={form.remarks}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          {saving
            ? "Saving..."
            : editingLead
            ? "Update Lead"
            : "Create Lead"}
        </button>

        {editingLead && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}