import { useState } from "react";

import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";
import CustomerProfile from "../components/CustomerProfile";

import type { Customer } from "../types/Customer";

export default function CustomersPage() {
  const [editingCustomer, setEditingCustomer] =
    useState<Customer | null>(null);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  function handleSuccess() {
    setEditingCustomer(null);
    setRefreshKey((prev) => prev + 1);
  }

  function handleEdit(customer: Customer) {
    setEditingCustomer(customer);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleView(customer: Customer) {
    setSelectedCustomer(customer);
  }

  function handleCancel() {
    setEditingCustomer(null);
  }

  function closeProfile() {
    setSelectedCustomer(null);
  }

  return (
    <div className="space-y-6 p-6">

      <div>
        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <p className="text-gray-500">
          Manage booked customers and payment information.
        </p>
      </div>

      <CustomerForm
        editingCustomer={editingCustomer}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />

      <CustomerTable
        key={refreshKey}
        onEdit={handleEdit}
        onView={handleView}
      />

      {selectedCustomer && (
        <CustomerProfile
          customer={selectedCustomer}
          onClose={closeProfile}
        />
      )}

    </div>
  );
}