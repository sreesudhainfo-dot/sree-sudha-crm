import { useEffect, useMemo, useState } from "react";

import { paymentPlanService } from "../services/paymentPlans";
import type { PaymentPlan } from "../types/PaymentPlans";

import { getCustomers } from "../../customers/services/customer";
import SearchSelect from "../../../components/common/SearchSelect";
import type { Customer } from "../../customers/types/Customer";
// interface Customer {
//   id: string;
//   customer_name: string;
//   phone: string;
//   sale_amount: number;
// }

interface PaymentPlanFormProps {
  paymentPlan?: PaymentPlan | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentPlanForm({
  paymentPlan,
  onSuccess,
  onCancel,
}: PaymentPlanFormProps) {
  const [loading, setLoading] = useState(false);

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [form, setForm] = useState({
    customer_id: "",

    total_amount: "",

    down_payment: "",

    months: "",

    first_due_date: "",
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const data = await getCustomers();

      setCustomers(data as Customer[]);
    } catch (err) {
      console.error(err);
    }
  }

  const calculation = useMemo(() => {
    const total = Number(form.total_amount) || 0;

    const down = Number(form.down_payment) || 0;

    const months = Number(form.months) || 0;

    const balance = total - down;

    const monthly =
      months > 0 ? balance / months : 0;

    let lastDate = "";

    if (form.first_due_date && months > 0) {
      const date = new Date(form.first_due_date);

      date.setMonth(date.getMonth() + months - 1);

      lastDate = date.toISOString().split("T")[0];
    }

    return {
      balance,
      monthly,
      lastDate,
    };
  }, [form]);

  function handleCustomerChange(customerId: string) {
  const customer = customers.find(
    (c) => c.id === customerId
  );

  if (!customer) return;

  setForm((prev) => ({
    ...prev,

    customer_id: customer.id,

    total_amount: String(customer.sale_amount),
  }));
}
    async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const plan = paymentPlanService.calculatePlan(
        Number(form.total_amount),
        Number(form.down_payment),
        Number(form.months),
        form.first_due_date
      );

      if (paymentPlan) {
        await paymentPlanService.update(paymentPlan.id, {
          customer_id: form.customer_id,
          ...plan,
        });
      } else {
        await paymentPlanService.create({
          customer_id: form.customer_id,
          ...plan,
        });
      }

      onSuccess();

    } catch (err) {
      console.error(err);

      alert("Failed to save payment plan.");

    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-6 shadow"
    >

      <h2 className="text-xl font-semibold">
        Payment Plan Calculator
      </h2>

      <SearchSelect
  label="Customer"
  placeholder="Search Customer..."
  options={customers.map((customer) => ({
    id: customer.id,
    label: `${customer.customer_name} • ${customer.phone}`,
  }))}
  value={form.customer_id}
  onChange={handleCustomerChange}
/>
{form.customer_id && (() => {
  const customer = customers.find(
    (c) => c.id === form.customer_id
  );

  if (!customer) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-lg border bg-slate-50 p-4">

      <div>
        <p className="text-xs text-slate-500">
          Project
        </p>

        <p className="font-semibold">
          {customer.project}
        </p>
      </div>

      <div>
        <p className="text-xs text-slate-500">
          Plot No
        </p>

        <p className="font-semibold">
          {customer.plot_number}
        </p>
      </div>

      <div>
        <p className="text-xs text-slate-500">
          Plot Value
        </p>

        <p className="font-semibold text-green-600">
          ₹ {customer.sale_amount.toLocaleString()}
        </p>
      </div>

      <div>
        <p className="text-xs text-slate-500">
          Balance
        </p>

        <p className="font-semibold text-red-600">
          ₹ {customer.balance_amount.toLocaleString()}
        </p>
      </div>

    </div>
  );
})()}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <div>
          <label className="mb-1 block font-medium">
            Total Plot Value
          </label>

          <input
            type="number"
            value={form.total_amount}
            onChange={(e) =>
              setForm({
                ...form,
                total_amount: e.target.value,
              })
            }
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Down Payment
          </label>

          <input
            type="number"
            value={form.down_payment}
            onChange={(e) =>
              setForm({
                ...form,
                down_payment: e.target.value,
              })
            }
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Number of Months
          </label>

          <input
            type="number"
            value={form.months}
            onChange={(e) =>
              setForm({
                ...form,
                months: e.target.value,
              })
            }
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            First Due Date
          </label>

          <input
            type="date"
            value={form.first_due_date}
            onChange={(e) =>
              setForm({
                ...form,
                first_due_date: e.target.value,
              })
            }
            className="w-full rounded-lg border p-2"
          />
        </div>

      </div>
            <div className="rounded-xl border bg-slate-50 p-5">

        <h3 className="mb-4 text-lg font-semibold">
          Payment Summary
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-sm text-slate-500">
              Remaining Balance
            </p>

            <p className="text-2xl font-bold text-red-600">
              ₹ {calculation.balance.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Monthly Installment
            </p>

            <p className="text-2xl font-bold text-blue-600">
              ₹ {calculation.monthly.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Installments
            </p>

            <p className="text-xl font-semibold">
              {form.months || 0}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Last Due Date
            </p>

            <p className="text-xl font-semibold">
              {calculation.lastDate || "-"}
            </p>
          </div>

        </div>

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
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : paymentPlan
            ? "Update Plan"
            : "Create Payment Plan"}
        </button>

      </div>

    </form>
  );
}