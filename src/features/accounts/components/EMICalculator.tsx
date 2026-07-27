import { useMemo, useState } from "react";
import { useEffect } from "react";
import SearchSelect from "../../../components/common/SearchSelect";
import { getCustomers } from "../../customers/services/customer";
import type { Customer } from "../../customers/types/Customer";

type CalculationMode = "months" | "monthlyBudget";

export default function EMICalculator() {
    const [customers, setCustomers] = useState<Customer[]>([]);
const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [plotPrice, setPlotPrice] = useState("");

  const [downPayment, setDownPayment] = useState("");

  const [mode, setMode] =
    useState<CalculationMode>("months");

  const [months, setMonths] = useState("");

  const [monthlyBudget, setMonthlyBudget] =
    useState("");

  const calculation = useMemo(() => {
    const total = Number(plotPrice) || 0;

    const down = Number(downPayment) || 0;

    const balance = Math.max(total - down, 0);

    if (mode === "months") {
      const totalMonths = Number(months) || 0;

      const emi =
        totalMonths > 0
          ? balance / totalMonths
          : 0;

      return {
        balance,
        emi,
        months: totalMonths,
      };
    }

    const budget =
      Number(monthlyBudget) || 0;

    const requiredMonths =
      budget > 0
        ? Math.ceil(balance / budget)
        : 0;

    return {
      balance,
      emi: budget,
      months: requiredMonths,
    };
  }, [
    plotPrice,
    downPayment,
    months,
    monthlyBudget,
    mode,
  ]);
    function handleReset() {
    setPlotPrice("");
    setDownPayment("");
    setMonths("");
    setMonthlyBudget("");
    setMode("months");
  }
  useEffect(() => {
  loadCustomers();
}, []);
function handleCustomerChange(id: string) {
  setSelectedCustomerId(id);

  const customer = customers.find((c) => c.id === id);

  if (!customer) return;

  setPlotPrice(String(customer.sale_amount));
}
async function loadCustomers() {
  try {
    const data = await getCustomers();
    setCustomers(data);
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className="rounded-xl bg-white p-6 shadow space-y-6">

      <div>
        <h2 className="text-2xl font-bold">
          EMI Calculator
        </h2>

        <p className="text-slate-500">
          Instantly calculate monthly installments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-1 font-medium">
            Plot Price
          </label>
<SearchSelect
  label="Customer"
  placeholder="Search Customer..."
  options={customers.map((customer) => ({
    id: customer.id,
    label: `${customer.customer_name} • ${customer.phone}`,
  }))}
  value={selectedCustomerId}
  onChange={handleCustomerChange}
/>
<br/>
{selectedCustomerId && (() => {
  const customer = customers.find(
    (c) => c.id === selectedCustomerId
  );

  if (!customer) return null;

  return (
    <div className="grid grid-cols-2 gap-4 rounded-lg border bg-slate-50 p-4">

      <div>
        <p className="text-xs text-slate-500">Project</p>
        <p className="font-semibold">{customer.project}</p>
      </div>

      <div>
        <p className="text-xs text-slate-500">Plot No</p>
        <p className="font-semibold">{customer.plot_number}</p>
      </div>

    </div>
  );
})()}
          <input
  type="number"
  readOnly={selectedCustomerId !== ""}
            // value={plotPrice}
            // onChange={(e) => setPlotPrice(e.target.value)}
            // className="w-full rounded-lg border p-2"
            // placeholder="1500000"
          />
        </div>
{/* <br/> */}
        <div>
          <label className="block mb-1 font-medium">
            Down Payment
          </label>

          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full rounded-lg border p-2"
            placeholder="300000"
          />
        </div>

      </div>

      <div className="space-y-3">

        <label className="font-medium">
          Calculation Mode
        </label>

        <div className="flex gap-6">

          <label className="flex items-center gap-2">

            <input
              type="radio"
              checked={mode === "months"}
              onChange={() => setMode("months")}
            />

            By Months

          </label>

          <label className="flex items-center gap-2">

            <input
              type="radio"
              checked={mode === "monthlyBudget"}
              onChange={() => setMode("monthlyBudget")}
            />

            By Monthly Budget

          </label>

        </div>

      </div>

      {mode === "months" ? (

        <div>

          <label className="block mb-1 font-medium">
            Number of Months
          </label>

          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-full rounded-lg border p-2"
            placeholder="24"
          />

        </div>

      ) : (

        <div>

          <label className="block mb-1 font-medium">
            Monthly Budget
          </label>

          <input
            type="number"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(e.target.value)}
            className="w-full rounded-lg border p-2"
            placeholder="50000"
          />

        </div>

      )}
            <div className="rounded-xl border bg-slate-50 p-5">

        <h3 className="mb-4 text-lg font-semibold">
          Calculation Result
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

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
              {mode === "months"
                ? "Monthly Installment"
                : "Monthly Budget"}
            </p>

            <p className="text-2xl font-bold text-blue-600">
              ₹ {calculation.emi.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              {mode === "months"
                ? "Total Months"
                : "Months Required"}
            </p>

            <p className="text-2xl font-bold text-green-600">
              {calculation.months}
            </p>
          </div>

        </div>

      </div>

      <div className="flex justify-end">

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg bg-slate-700 px-5 py-2 text-white hover:bg-slate-800"
        >
          Reset Calculator
        </button>

      </div>

    </div>
  );
}