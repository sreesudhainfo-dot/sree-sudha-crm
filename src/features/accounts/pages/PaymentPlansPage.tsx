import { useEffect, useState } from "react";

import PaymentPlanForm from "../components/PaymentPlantForm";
import PaymentPlanTable from "../components/PaymentPlanTable";

import { paymentPlanService } from "../services/paymentPlans";

import type { PaymentPlan } from "../types/PaymentPlans";

export default function PaymentPlansPage() {

  const [plans, setPlans] = useState<PaymentPlan[]>([]);

  const [selectedPlan, setSelectedPlan] =
    useState<PaymentPlan | null>(null);

  const [showForm, setShowForm] = useState(false);

  async function loadPlans() {

    try {

      const data = await paymentPlanService.getAll();

      setPlans(data);

    } catch (error) {

      console.error(error);

      alert("Failed to load payment plans.");

    }

  }

  useEffect(() => {

    loadPlans();

  }, []);

  function handleEdit(plan: PaymentPlan) {

    setSelectedPlan(plan);

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }
    function handleAddNew() {

    setSelectedPlan(null);

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }

  function handleSuccess() {

    setShowForm(false);

    setSelectedPlan(null);

    loadPlans();

  }

  function handleCancel() {

    setShowForm(false);

    setSelectedPlan(null);

  }

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Payment Plans
          </h1>

          <p className="text-slate-500">
            Manage customer payment plans and installments
          </p>

        </div>

        <button
          onClick={handleAddNew}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          + Create Payment Plan
        </button>

      </div>

      {showForm && (

        <PaymentPlanForm
          paymentPlan={selectedPlan}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />

      )}
            <PaymentPlanTable
        plans={plans}
        onEdit={handleEdit}
        onRefresh={loadPlans}
      />

    </div>

  );

}