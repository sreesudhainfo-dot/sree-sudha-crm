import { useEffect, useState } from "react";
import type { Customer, PaymentStatus } from "../types/Customer";
import {
  createCustomer,
  updateCustomer,
} from "../services/customer";

interface CustomerFormProps {
  editingCustomer?: Customer | null;
  onSuccess: () => void;
  onCancel?: () => void;
}

const paymentStatuses: PaymentStatus[] = [
  "Pending",
  "Partial",
  "Completed",
];

const initialState = {
  customer_name: "",
  phone: "",
  alternate_phone: "",
  email: "",
  project: "",
  plot_number: "",
  plot_size: "",
  sale_amount: "",
  booking_amount: "",
  balance_amount: "",
  payment_status: "Pending" as PaymentStatus,
  agreement_date: "",
  registration_date: "",
  remarks: "",
};

export default function CustomerForm({
  editingCustomer,
  onSuccess,
  onCancel,
}: CustomerFormProps) {
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editingCustomer) {
      setForm(initialState);
      return;
    }

    setForm({
      customer_name: editingCustomer.customer_name,
      phone: editingCustomer.phone,
      alternate_phone: editingCustomer.alternate_phone ?? "",
      email: editingCustomer.email ?? "",
      project: editingCustomer.project,
      plot_number: editingCustomer.plot_number,
      plot_size: editingCustomer.plot_size,
      sale_amount: editingCustomer.sale_amount.toString(),
      booking_amount: editingCustomer.booking_amount.toString(),
      balance_amount: editingCustomer.balance_amount.toString(),
      payment_status: editingCustomer.payment_status,
      agreement_date: editingCustomer.agreement_date ?? "",
      registration_date: editingCustomer.registration_date ?? "",
      remarks: editingCustomer.remarks ?? "",
    });
  }, [editingCustomer]);

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

    setSaving(true);

    try {
      const customerData = {
        customer_name: form.customer_name,
        phone: form.phone,
        alternate_phone: form.alternate_phone || undefined,
        email: form.email || undefined,
        project: form.project,
        plot_number: form.plot_number,
        plot_size: form.plot_size,
        sale_amount: Number(form.sale_amount),
        booking_amount: Number(form.booking_amount),
        balance_amount: Number(form.balance_amount),
        payment_status: form.payment_status,
        agreement_date: form.agreement_date || undefined,
        registration_date: form.registration_date || undefined,
        remarks: form.remarks || undefined,
      };

      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, customerData);
      } else {
        await createCustomer({
          customer_id: `CUS-${Date.now()}`,
          lead_id: undefined,
          ...customerData,
        });
      }

      setForm(initialState);
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Failed to save customer.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold">
        {editingCustomer ? "Edit Customer" : "Add Customer"}
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

        <input
          name="project"
          placeholder="Project"
          value={form.project}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />

        <input
          name="plot_number"
          placeholder="Plot Number"
          value={form.plot_number}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />

        <input
          name="plot_size"
          placeholder="Plot Size"
          value={form.plot_size}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />

        <input
          type="number"
          name="sale_amount"
          placeholder="Sale Amount"
          value={form.sale_amount}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />

        <input
          type="number"
          name="booking_amount"
          placeholder="Booking Amount"
          value={form.booking_amount}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="number"
          name="balance_amount"
          placeholder="Balance Amount"
          value={form.balance_amount}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <select
          name="payment_status"
          value={form.payment_status}
          onChange={handleChange}
          className="border rounded p-2"
        >
          {paymentStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="agreement_date"
          value={form.agreement_date}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="date"
          name="registration_date"
          value={form.registration_date}
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {saving
            ? "Saving..."
            : editingCustomer
            ? "Update Customer"
            : "Create Customer"}
        </button>

        {editingCustomer && (
          <button
            type="button"
            onClick={onCancel}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}