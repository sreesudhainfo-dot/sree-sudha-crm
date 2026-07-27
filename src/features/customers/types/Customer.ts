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

  customer_plot_number?:string;

customer_project?:string;
  remarks?: string;

  created_at: string;

  updated_at: string;
  
}