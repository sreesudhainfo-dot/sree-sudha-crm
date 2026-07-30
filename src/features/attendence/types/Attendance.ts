export type AttendanceStatus =
  | "Present"
  | "Leave"
  | "Half Day";

export interface Attendance {
  id: string;

  employee_id: string;

  employee_name: string;

  attendance_date: string;

  status: AttendanceStatus;

  check_in: string | null;

  check_out: string | null;

  created_at?: string;

  updated_at?: string;
}