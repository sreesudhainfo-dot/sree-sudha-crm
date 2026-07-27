// src/features/leads/types/Lead.ts

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Interested"
  | "Site Visit Scheduled"
  | "Visited"
  | "Booked"
  | "Closed"
  | "Lost";

export type LeadSource =
  | "Facebook"
  | "Instagram"
  | "Google"
  | "Website"
  | "Walk-in"
  | "Reference"
  | "JustDial"
  | "WhatsApp"
  | "Hoarding"
  | "Other";

export interface Lead {
  id: string;

  // Display Lead ID (LD-0001)
  lead_id: string;

  // Customer Information
  customer_name: string;
  phone: string;
  alternate_phone?: string;
  email?: string;

  // Lead Details
  source: LeadSource;
  project: string;
  budget?: number;
  location?: string;

  // Assignment
  assigned_to?: string;
  assigned_employee_name?: string;

  // Status
  status: LeadStatus;

  // Visit
  site_visit_date?: string;

  // Notes
  remarks?: string;

  // Conversion
  booking_amount?: number;
  conversion_date?: string;

  // Audit
  created_at: string;
  updated_at: string;
}