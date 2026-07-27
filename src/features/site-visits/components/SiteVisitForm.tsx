import { useEffect, useState } from "react";

import type { SiteVisit, VisitStatus } from "../types/SiteVisit";
import { siteVisitService } from "../services/siteVisits";

import { getLeads } from "../../leads/services/leads";
import { getEmployees } from "../../../services/employees";

import { generateId } from "../../../utils/generatedId";

import SearchSelect from "../../../components/common/SearchSelect";

interface Lead {
  id: string;
  customer_name: string;
  phone: string;
  project: string;
}

interface Employee {
  id: string;
  employee_id: string;
  full_name: string;
}

interface Props {
  editingVisit?: SiteVisit | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

const statuses: VisitStatus[] = [
  "Scheduled",
  "Completed",
  "Cancelled",
  "Rescheduled",
];

export default function SiteVisitForm({
  editingVisit,
  onSuccess,
  onCancel,
}: Props) {
  const [leads, setLeads] = useState<Lead[]>([]);
  
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    lead_id: "",
    customer_name: "",
    phone: "",
    project: "",
    assigned_employee: "",
    visit_date: "",
    visit_time: "",
    vehicle: "",
    pickup_location: "",
    remarks: "",
    status: "Scheduled" as VisitStatus,
  });

  useEffect(() => {
    loadDropdowns();
  }, []);

  useEffect(() => {
    if (!editingVisit) return;

    setForm({
      lead_id: editingVisit.lead_id,
      customer_name: editingVisit.customer_name,
      phone: editingVisit.phone,
      project: editingVisit.project,
      assigned_employee: editingVisit.assigned_employee,
      visit_date: editingVisit.visit_date,
      visit_time: editingVisit.visit_time,
      vehicle: editingVisit.vehicle || "",
      pickup_location: editingVisit.pickup_location || "",
      remarks: editingVisit.remarks || "",
      status: editingVisit.status,
    });
  }, [editingVisit]);

  async function loadDropdowns() {
  try {
const [leadData, employeeData] = await Promise.all([
  getLeads(),
  getEmployees(),
]);

console.log("Lead Data:", leadData);
console.log("Employee Data:", employeeData);

setLeads(leadData);
setEmployees(employeeData);
  } catch (err) {
    console.error(err);
  }
}

//   function handleLeadChange(id: string) {
//     const lead = leads.find((l) => l.id === id);

//     if (!lead) return;

//     setForm((prev) => ({
//       ...prev,
//       lead_id: id,
//       customer_name: lead.customer_name,
//       phone: lead.phone,
//       project: lead.project,
//     }));
//   }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      if (editingVisit) {
        await siteVisitService.update(editingVisit.id, form);
      } else {
        await siteVisitService.create({
          visit_id: generateId("VIS"),
          ...form,
        });
        
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Unable to save site visit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold">
        {editingVisit ? "Edit Site Visit" : "Schedule Site Visit"}
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <SearchSelect
  label="Lead"
  placeholder="Search customer name or phone..."
  value={form.lead_id}
  onChange={(leadId) => {
    const selectedLead = leads.find((lead) => lead.id === leadId);

    if (!selectedLead) return;

    setForm((prev) => ({
      ...prev,
      lead_id: selectedLead.id,
      customer_name: selectedLead.customer_name,
      phone: selectedLead.phone,
      project: selectedLead.project,
    }));
  }}
  options={leads.map((lead) => ({
    id: lead.id,
    label: lead.customer_name,
    subLabel: `${lead.phone} • ${lead.project}`,
  }))}
/>

        <SearchSelect
  label="Assigned Employee"
  placeholder="Search employee..."
  value={form.assigned_employee}
  onChange={(value) =>
    setForm((prev) => ({
      ...prev,
      assigned_employee: value,
    }))
  }
  options={employees.map((emp) => ({
    id: emp.id,
    label: emp.full_name || emp.employee_id,
    subLabel: emp.employee_id,
  }))}
/>

        <input
          value={form.customer_name}
          readOnly
          placeholder="Customer"
          className="border rounded-lg p-2 bg-gray-100"
        />

        <input
          value={form.phone}
          readOnly
          placeholder="Phone"
          className="border rounded-lg p-2 bg-gray-100"
        />

        <input
          value={form.project}
          readOnly
          placeholder="Project"
          className="border rounded-lg p-2 bg-gray-100"
        />

        <input
          type="date"
          name="visit_date"
          value={form.visit_date}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <input
          type="time"
          name="visit_time"
          value={form.visit_time}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <input
          name="vehicle"
          value={form.vehicle}
          onChange={handleChange}
          placeholder="Vehicle"
          className="border rounded-lg p-2"
        />

        <input
          name="pickup_location"
          value={form.pickup_location}
          onChange={handleChange}
          placeholder="Pickup Location"
          className="border rounded-lg p-2"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border rounded-lg p-2"
        >
          {statuses.map((status) => (
            <option key={status}>
              {status}
            </option>
          ))}
        </select>

      </div>

      <textarea
        rows={4}
        name="remarks"
        value={form.remarks}
        onChange={handleChange}
        placeholder="Remarks"
        className="w-full border rounded-lg p-3"
      />

      <div className="flex gap-3">

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          {loading
            ? "Saving..."
            : editingVisit
            ? "Update Visit"
            : "Create Visit"}
        </button>

        {editingVisit && (
          <button
            type="button"
            onClick={onCancel}
            className="border px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        )}

      </div>
    </form>
  );
}