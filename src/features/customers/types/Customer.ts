export type PaymentStatus =
  | "Pending"
  | "Partial"
  | "Completed";

export interface Customer {
  id: string;

  customer_id: string;

  lead_id?: string;

  customer_name: string;

  phone: string;

  assigned_to?: string;

  assigned_employee_name?: string;

  alternate_phone?: string;

  email?: string;

  project: string;

  plot_number: string;

  plot_size: string;

  sale_amount: number;

  booking_amount: number;

  balance_amount: number;

  payment_status: PaymentStatus;

  agreement_date?: string;

  registration_date?: string;

  remarks?: string;

  created_at: string;

  updated_at: string;
  employees?: {
  full_name: string;
};
}