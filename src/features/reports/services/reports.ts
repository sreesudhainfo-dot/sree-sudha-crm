import { supabase } from "../../../lib/supabase";

/* ==========================================
   CURRENT MONTH HELPER
========================================== */

function isCurrentMonth(date: string | null | undefined) {
  if (!date) return false;

  const d = new Date(date);
  const now = new Date();

  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth()
  );
}

/* ==========================================
   EMPLOYEES
========================================== */

export async function getEmployees() {
  const { data, error } = await supabase
    .from("employees")
    .select(`
      *,
      roles!employees_role_id_fkey (
        id,
        role_name
      )
    `)
    .order("full_name");

  if (error) throw error;

  console.log(data);

  return data ?? [];
}

/* ==========================================
   ATTENDANCE
========================================== */

export async function getAttendance() {
  const { data, error } = await supabase
    .from("attendance")
    .select("*");

  if (error) throw error;

  return data ?? [];
}

/* ==========================================
   LEADS
========================================== */

export async function getLeads() {
  const { data, error } = await supabase
    .from("leads")
    .select("*");

  if (error) throw error;

  return data ?? [];
}

/* ==========================================
   CUSTOMERS
========================================== */

export async function getCustomers() {
  const { data, error } = await supabase
    .from("customers")
    .select("*");

  if (error) throw error;

  return data ?? [];
}

/* ==========================================
   SITE VISITS
========================================== */

export async function getSiteVisits() {
  const { data, error } = await supabase
    .from("site_visits")
    .select("*");

  if (error) throw error;

  return data ?? [];
}

/* ==========================================
   EMPLOYEE PERFORMANCE
========================================== */

export async function getEmployeePerformance() {
 const [
  employees,
  attendance,
  leads,
  customers,
] = await Promise.all([
  getEmployees(),
  getAttendance(),
  getLeads(),
  getCustomers(),
]);

  return employees.map((employee: any) => {
    /* -------------------------
       ATTENDANCE
    -------------------------- */

    const employeeAttendance = attendance.filter(
      (item: any) =>
        item.employee_id === employee.employee_id &&
        isCurrentMonth(item.attendance_date)
    );

    const presentDays = employeeAttendance.filter(
      (item: any) => item.status === "Present"
    ).length;

    /* -------------------------
       LEADS
    -------------------------- */

    const employeeLeads = leads.filter(
      (lead: any) =>
        Number(lead.assigned_to) === Number(employee.id) &&
        isCurrentMonth(lead.created_at)
    );

    /* -------------------------
       CUSTOMERS
    -------------------------- */

    const employeeCustomers = customers.filter(
      (customer: any) =>
        Number(customer.assigned_to) === Number(employee.id) &&
        isCurrentMonth(customer.created_at)
    );

    /* -------------------------
       BOOKINGS
    -------------------------- */

    const bookings = employeeCustomers.filter(
      (customer: any) =>
        Number(customer.booking_amount ?? 0) > 0
    );

    return {
      employee,

      attendance: presentDays,

      leads: employeeLeads.length,

      customers: employeeCustomers.length,

      bookings: bookings.length,

      attendanceList: employeeAttendance,

      leadList: employeeLeads,

      customerList: employeeCustomers,
    };
  });
}
