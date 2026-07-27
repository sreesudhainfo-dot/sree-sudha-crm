export type PaymentPlanStatus =
  | "Active"
  | "Completed"
  | "Cancelled";

export interface PaymentPlan {
  id: string;

  customer_id: string;

  total_amount: number;

  down_payment: number;

  balance_amount: number;

  installment_amount: number;

  number_of_installments: number;

  completed_installments: number;

  remaining_installments: number;

  first_due_date: string;

  next_due_date: string;

  last_due_date: string;

  status: PaymentPlanStatus;

  created_at: string;

  updated_at: string;
}