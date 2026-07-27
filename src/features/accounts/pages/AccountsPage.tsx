import EMICalculator from "../components/EMICalculator";

export default function AccountsPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Accounts
        </h1>

        <p className="text-slate-500">
          EMI & Payment Calculator
        </p>
      </div>

      <EMICalculator />

    </div>
  );
}