export type LeadSource =
  | "Facebook"
  | "Instagram"
  | "Google"
  | "Website"
  | "WhatsApp"
  | "JustDial"
  | "Walk-in"
  | "Reference"
  | "Other";

export type LeadStatus =
  | "New"
  | "Assigned"
  | "Contacted"
  | "Interested"
  | "Site Visit Scheduled"
  | "Visited"
  | "Booked"
  | "Closed"
  | "Lost";

export interface LeadPool {
  id: string;

  lead_id: string;

  customer_name: string;

  phone: string;

  alternate_phone?: string;

  email?: string;

  source: LeadSource;

  project: string;

  budget?: number;

  location?: string;

  assigned_to?: string;

assigned_telecaller?: string;
assigned_marketer?: string;
assigned_employee_name? : string;
booking_amount?:string;
  status: LeadStatus;
conversion_date?:string;
  follow_up_date?: string | null;

  site_visit_date?: string | null;

  remarks?: string;

  created_at: string;

  updated_at: string;
}