export interface ReportFilter {
  fromDate: string;
  toDate: string;
  employeeId: string;
}

export interface SummaryCard {
  title: string;
  value: number | string;
}

export interface EmployeePerformance {
  employeeId: string;
  employeeName: string;
  role: string;

  attendance: number;

  leads: number;

  siteVisits: number;

  bookings: number;

  customers: number;

  revenue: number;
}

export interface CustomerAssignment {
  customerName: string;
  phone: string;

  assignedTo: string;

  status: string;

  bookingAmount?: number;
}