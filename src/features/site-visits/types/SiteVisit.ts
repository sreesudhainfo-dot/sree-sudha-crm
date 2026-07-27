export type VisitStatus =
  | "Scheduled"
  | "Completed"
  | "Cancelled"
  | "Rescheduled";

export interface SiteVisit {
  id: string;

  visit_id: string;

  lead_id: string;

  customer_name: string;

  phone: string;

  project: string;

  assigned_employee: string;

  visit_date: string;

  visit_time: string;

  vehicle?: string;

  pickup_location?: string;

  outcome?: string;

  remarks?: string;

  status: VisitStatus;

  created_at: string;

  updated_at: string;
}