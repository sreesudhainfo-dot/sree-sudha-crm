export type MarketingRole =
  | "Manager"
  | "Agent"
  | "Sub Agent";

export type EmployeeStatus =
  | "Active"
  | "Inactive";

export interface MarketingEmployee {
  id: string;

  employee_id: string;

  full_name: string;

  designation: string;

  role: MarketingRole;

  manager_id: string | null;

  phone: string;

  email: string;

  joining_date: string;

  status: EmployeeStatus;

  created_at: string;
}