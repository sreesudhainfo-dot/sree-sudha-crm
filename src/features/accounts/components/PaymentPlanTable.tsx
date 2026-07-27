import { FaEdit } from "react-icons/fa";
import type { PaymentPlan } from "../types/PaymentPlans";

interface PaymentPlanTableProps {
  plans: PaymentPlan[];
  onEdit: (plan: PaymentPlan) => void;
  onRefresh: () => void | Promise<void>;
}

export default function PaymentPlanTable({
  plans,
  onEdit,
}: PaymentPlanTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Customer ID</th>
            <th className="px-4 py-3 text-left">Total Amount</th>
            <th className="px-4 py-3 text-left">Down Payment</th>
            <th className="px-4 py-3 text-left">Balance</th>
            <th className="px-4 py-3 text-left">Monthly EMI</th>
            <th className="px-4 py-3 text-left">Remaining EMI</th>
            <th className="px-4 py-3 text-left">Next Due</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {plans.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="py-8 text-center text-slate-500"
              >
                No payment plans found.
              </td>
            </tr>
          ) : (
            plans.map((plan) => (
              <tr
                key={plan.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  {plan.customer_id}
                </td>

                <td className="px-4 py-3">
                  ₹ {plan.total_amount.toLocaleString()}
                </td>

                <td className="px-4 py-3">
                  ₹ {plan.down_payment.toLocaleString()}
                </td>

                <td className="px-4 py-3 font-semibold text-red-600">
                  ₹ {plan.balance_amount.toLocaleString()}
                </td>

                <td className="px-4 py-3 font-semibold text-blue-600">
                  ₹ {plan.installment_amount.toLocaleString()}
                </td>

                <td className="px-4 py-3">
                  {plan.remaining_installments} / {plan.number_of_installments}
                </td>

                <td className="px-4 py-3">
                  {plan.next_due_date}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      plan.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : plan.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {plan.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onEdit(plan)}
                    className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}