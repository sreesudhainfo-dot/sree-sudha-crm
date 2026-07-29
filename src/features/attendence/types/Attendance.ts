export type AttendanceStatus =
  | "Present"
  | "Leave"
  | "Half Day";

export interface Attendance {
  id: number;
  employee_id: string;
  full_name: string;
  role_id: number;

  roles?: {
    id: number;
    role_name: string;
  };

//   remarks?: string;

  created_at?: string;

  updated_at?: string;
}