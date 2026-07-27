import { BaseCrudService } from "../../../services/BaseCrudService";
import type { PaymentPlan } from "../types/PaymentPlans";

class PaymentPlanService extends BaseCrudService<PaymentPlan> {
  constructor() {
    super("payment_plans");
  }

  async getCustomerPlan(customerId: string) {
    const plans = await this.getAll();

    return (
      plans.find((plan) => plan.customer_id === customerId) ?? null
    );
  }

  calculatePlan(
    totalAmount: number,
    downPayment: number,
    months: number,
    firstDueDate: string
  ) {
    const balanceAmount = totalAmount - downPayment;

    const installmentAmount =
      months > 0 ? balanceAmount / months : 0;

    const firstDate = new Date(firstDueDate);

    const lastDate = new Date(firstDate);

    lastDate.setMonth(lastDate.getMonth() + months - 1);

    return {
      total_amount: totalAmount,

      down_payment: downPayment,

      balance_amount: balanceAmount,

      installment_amount: Number(
        installmentAmount.toFixed(2)
      ),

      number_of_installments: months,

      completed_installments: 0,

      remaining_installments: months,

      first_due_date: firstDueDate,

      next_due_date: firstDueDate,

      last_due_date: lastDate
        .toISOString()
        .split("T")[0],

      status: "Active" as const,
    };
  }
}

export const paymentPlanService = new PaymentPlanService();