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
    siteVisits,
  ] = await Promise.all([
    getEmployees(),
    getAttendance(),
    getLeads(),
    getCustomers(),
    getSiteVisits(),
  ]);

  return employees.map((employee: any) => {
        /* -------------------------
       ATTENDANCE (Current Month)
    -------------------------- */

    const employeeAttendance = attendance.filter(
      (item: any) =>
        item.employee_id === employee.employee_id &&
        isCurrentMonth(item.attendance_date)
    );

    const presentDays = employeeAttendance.filter(
      (item: any) => item.status === "Present"
    ).length;

    const totalAttendanceDays =
      employeeAttendance.length;

    const attendancePercentage =
      totalAttendanceDays === 0
        ? 0
        : presentDays
    /* -------------------------
       LEADS (Current Month)
    -------------------------- */

    const employeeLeads = leads.filter(
      (lead: any) =>
        Number(lead.assigned_to) ===
          Number(employee.id) &&
        isCurrentMonth(lead.created_at)
    );

    /* -------------------------
       CUSTOMERS (Current Month)
       Customer -> Lead -> Employee
    -------------------------- */

    const employeeCustomers =
      customers.filter((customer: any) => {

        const lead = leads.find(
          (l: any) =>
            l.id === customer.lead_id
        );

        if (!lead) return false;

        return (
          Number(lead.assigned_to) ===
            Number(employee.id) &&
          isCurrentMonth(
            customer.created_at
          )
        );
      });

    /* -------------------------
       SITE VISITS (Current Month)
    -------------------------- */

    const employeeSiteVisits =
      siteVisits.filter(
        (visit: any) =>
          Number(
            visit.assigned_employee
          ) === Number(employee.id) &&
          isCurrentMonth(
            visit.visit_date
          )
      );

    /* -------------------------
       BOOKINGS
    -------------------------- */

    const bookings =
      employeeCustomers.filter(
        (customer: any) =>
          Number(
            customer.booking_amount ?? 0
          ) > 0
      );

    const bookingAmount =
      bookings.reduce(
        (
          sum: number,
          booking: any
        ) =>
          sum +
          Number(
            booking.booking_amount ??
              0
          ),
        0
      );
      return {
  employee,

  attendance: attendancePercentage,

  presentDays,

  leads: employeeLeads.length,

  customers: employeeCustomers.length,

  siteVisits: employeeSiteVisits.length,

  bookings: bookings.length,

  revenue: bookingAmount,
};
  });
}
