import { useEffect, useState } from "react";
import { leadPoolService } from "../../leads/services/leadPool";
import type { LeadPool, LeadSource } from "../../leads/types/LeadPools";
import { generateId } from "../../../utils/generatedId";

interface LeadPoolFormProps {
  editingLead?: LeadPool | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const sources: LeadSource[] = [
  "Facebook",
  "Instagram",
  "Google",
  "Website",
  "WhatsApp",
  "JustDial",
  "Walk-in",
  "Reference",
  "Other",
];

export default function LeadPoolForm({
  editingLead,
  onSuccess,
  onCancel,
}: LeadPoolFormProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    alternate_phone: "",
    email: "",
    source: "Facebook" as LeadSource,
    project: "",
    budget: "",
    location: "",
    remarks: "",
  });

  useEffect(() => {
    if (editingLead) {
      setForm({
        customer_name: editingLead.customer_name,
        phone: editingLead.phone,
        alternate_phone: editingLead.alternate_phone ?? "",
        email: editingLead.email ?? "",
        source: editingLead.source,
        project: editingLead.project,
        budget: editingLead.budget?.toString() ?? "",
        location: editingLead.location ?? "",
        remarks: editingLead.remarks ?? "",
      });
    }
  }, [editingLead]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
            if (editingLead) {
        await leadPoolService.update(editingLead.id, {
          customer_name: form.customer_name,
          phone: form.phone,
          alternate_phone: form.alternate_phone || undefined,
          email: form.email || undefined,
          source: form.source,
          project: form.project,
          budget: form.budget ? Number(form.budget) : undefined,
          location: form.location || undefined,
          remarks: form.remarks || undefined,
        });
      } else {
        await leadPoolService.create({
          lead_id: generateId("LD"),

          customer_name: form.customer_name,

          phone: form.phone,

          alternate_phone: form.alternate_phone || undefined,

          email: form.email || undefined,

          source: form.source,

          project: form.project,

          budget: form.budget ? Number(form.budget) : undefined,

          location: form.location || undefined,

          assigned_to: undefined,

          assigned_employee_name: undefined,

          status: "New",

          site_visit_date: undefined,

          remarks: form.remarks || undefined,

          booking_amount: undefined,

          conversion_date: undefined,
        });

      }

      setForm({
        customer_name: "",
        phone: "",
        alternate_phone: "",
        email: "",
        source: "Facebook",
        project: "",
        budget: "",
        location: "",
        remarks: "",
      });

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to save lead.");
    } finally {
      setLoading(false);
    }
  }
    return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <div>
          <label className="mb-1 block text-sm font-medium">
            Customer Name
          </label>

          <input
            type="text"
            name="customer_name"
            value={form.customer_name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Alternate Phone
          </label>

          <input
            type="text"
            name="alternate_phone"
            value={form.alternate_phone}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Lead Source
          </label>

          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          >
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Project
          </label>

          <input
            type="text"
            name="project"
            value={form.project}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Budget
          </label>

          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Preferred Location
          </label>

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Remarks
        </label>

        <textarea
          name="remarks"
          rows={4}
          value={form.remarks}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-5 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          {loading
            ? "Saving..."
            : editingLead
            ? "Update Lead"
            : "Create Lead"}
        </button>

      </div>

    </form>
  );
}