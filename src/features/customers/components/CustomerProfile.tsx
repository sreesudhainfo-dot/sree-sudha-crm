import type { Customer } from "../types/Customer";

interface CustomerProfileProps {
  customer: Customer;
  onClose: () => void;
}

export default function CustomerProfile({
  customer,
  onClose,
}: CustomerProfileProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-full max-w-xl bg-white h-full overflow-y-auto shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-bold">
              Customer Profile
            </h2>
            <p className="text-gray-500">
              {customer.customer_name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-8">

          {/* Customer Details */}
          <section>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Customer Details
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <Info label="Customer ID" value={customer.customer_id} />
              <Info label="Name" value={customer.customer_name} />
              <Info label="Phone" value={customer.phone} />
              <Info label="Alternate Phone" value={customer.alternate_phone} />
              <Info label="Email" value={customer.email} />
              <Info label="Project" value={customer.project} />

            </div>
          </section>

          {/* Plot Details */}
          <section>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Plot Details
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <Info label="Plot Number" value={customer.plot_number} />
              <Info label="Plot Size" value={customer.plot_size} />

            </div>
          </section>

          {/* Payment Summary */}
          <section>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Payment Summary
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <Info
                label="Sale Amount"
                value={`₹ ${customer.sale_amount.toLocaleString("en-IN")}`}
              />

              <Info
                label="Booking Amount"
                value={`₹ ${customer.booking_amount.toLocaleString("en-IN")}`}
              />

              <Info
                label="Balance Amount"
                value={`₹ ${customer.balance_amount.toLocaleString("en-IN")}`}
              />

              <Info
                label="Payment Status"
                value={customer.payment_status}
              />

            </div>
          </section>

          {/* Agreement */}
          <section>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Registration Details
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <Info
                label="Agreement Date"
                value={customer.agreement_date}
              />

              <Info
                label="Registration Date"
                value={customer.registration_date}
              />

            </div>
          </section>

          {/* Remarks */}
          <section>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Remarks
            </h3>

            <div className="bg-gray-50 rounded-lg p-4 min-h-[100px]">
              {customer.remarks || "No remarks available."}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

interface InfoProps {
  label: string;
  value?: string | number | null;
}

function Info({ label, value }: InfoProps) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-medium">
        {value || "-"}
      </p>
    </div>
  );
}