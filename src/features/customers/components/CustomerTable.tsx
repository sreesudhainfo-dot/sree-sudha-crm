import { useEffect, useMemo, useState } from "react";
import type { Customer, PaymentStatus } from "../types/Customer";
import {
  getCustomers,
  deleteCustomer,
} from "../services/customer";

interface CustomerTableProps {
  onEdit: (customer: Customer) => void;
  onView: (customer: Customer) => void;
}

const paymentStatuses: ("All" | PaymentStatus)[] = [
  "All",
  "Pending",
  "Partial",
  "Completed",
];

export default function CustomerTable({
  onEdit,
  onView,
}: CustomerTableProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"All" | PaymentStatus>("All");

  async function loadCustomers() {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load customers");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) return;

    try {
      await deleteCustomer(id);
      await loadCustomers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete customer");
    }
  }

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const q = search.toLowerCase();

      const matchesSearch =
        customer.customer_name.toLowerCase().includes(q) ||
        customer.phone.includes(search) ||
        customer.customer_id.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" ||
        customer.payment_status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  function getStatusClasses(status: PaymentStatus) {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Partial":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-red-100 text-red-700";
    }
  }

  if (loading) {
    return <p>Loading customers...</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name, phone, or customer ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value as "All" | PaymentStatus
            )
          }
          className="border rounded-lg px-3 py-2"
        >
          {paymentStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-3">Customer ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Project</th>
              <th className="text-left p-3">
  Assigned Employee
</th>
              <th className="text-left p-3">Plot</th>
              <th className="text-left p-3">Sale Amount</th>
              <th className="text-left p-3">Payment</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">
                  {customer.customer_id}
                </td>

                <td className="p-3">{customer.customer_name}</td>

                <td className="p-3">{customer.phone}</td>

                <td className="p-3">{customer.project}</td>
<td className="p-3">
  {customer.assigned_employee_name ?? "-"}
</td>
                <td className="p-3">{customer.plot_number}</td>

                <td className="p-3">
                  ${customer.sale_amount.toLocaleString()}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusClasses(
                      customer.payment_status
                    )}`}
                  >
                    {customer.payment_status}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex gap-3 text-sm">
                    <button
                      onClick={() => onView(customer)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>

                    <button
                      onClick={() => onEdit(customer)}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredCustomers.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center p-6 text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}