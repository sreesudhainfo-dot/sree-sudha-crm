import { supabase } from "../../../lib/supabase";

/* ===========================
   EMPLOYEES
=========================== */

export async function getEmployees() {
  const { data, error } = await supabase
    .from("employees")
    .select(
      `
      *,
      roles (
        role_name
      )
    `
    )
    .order("full_name");

  if (error) throw error;

  return data ?? [];
}

/* ===========================
   ATTENDANCE
=========================== */

export async function getAttendance() {
  const { data, error } = await supabase
    .from("attendance")
    .select("*");

  if (error) throw error;

  return data ?? [];
}

/* ===========================
   LEADS
=========================== */

export async function getLeads() {
  const { data, error } = await supabase
    .from("leads")
    .select("*");

  if (error) throw error;

  return data ?? [];
}

/* ===========================
   CUSTOMERS
=========================== */

export async function getCustomers() {
  const { data, error } = await supabase
    .from("customers")
    .select("*");

  if (error) throw error;

  return data ?? [];
}

/* ===========================
   SITE VISITS
=========================== */

export async function getSiteVisits() {
  const { data, error } = await supabase
    .from("site_visits")
    .select("*");

  if (error) throw error;

  return data ?? [];
}

/* ===========================
   EMPLOYEE PERFORMANCE
=========================== */

export async function getEmployeePerformance() {
  const [
    employees,
    customers,
    leads,
    attendance,
    siteVisits,
  ] = await Promise.all([
    getEmployees(),
    getCustomers(),
    getLeads(),
    getAttendance(),
    getSiteVisits(),
  ]);

  return employees.map((employee: any) => {
    // Leads
    const employeeLeads = leads.filter((lead: any) => {
  const assignedEmployee = employees.find(
    (emp: any) => Number(emp.id) === Number(lead.assigned_to)
  );

  return assignedEmployee?.full_name === employee.full_name;
});

    // Customers
    const employeeCustomers = customers.filter((customer: any) => {
  const assignedEmployee = employees.find(
    (emp: any) => Number(emp.id) === Number(customer.assigned_to)
  );

  return assignedEmployee?.full_name === employee.full_name;
});

    // Attendance
    const employeeAttendance = attendance.filter((item: any) => {
  const attendanceEmployee = employees.find(
    (emp: any) => Number(emp.id) === Number(item.employee_id)
  );

  return attendanceEmployee?.full_name === employee.full_name;
});

    const presentDays = employeeAttendance.filter(
      (item: any) => item.status === "Present"
    ).length;

    // Site Visits
    const employeeSiteVisits = siteVisits.filter((visit: any) => {
  const assignedEmployee = employees.find(
    (emp: any) => Number(emp.id) === Number(visit.assigned_employee)
  );

  return assignedEmployee?.full_name === employee.full_name;
});

    // Bookings
    const bookings = employeeCustomers.filter(
      (customer: any) =>
        Number(customer.booking_amount ?? 0) > 0
    );

    const bookingAmount = bookings.reduce(
      (sum: number, customer: any) =>
        sum + Number(customer.booking_amount ?? 0),
      0
    );

    return {
      employee,

      attendance: presentDays,

      totalLeads: employeeLeads.length,

      totalCustomers: employeeCustomers.length,

      totalSiteVisits: employeeSiteVisits.length,

      totalBookings: bookings.length,

      bookingAmount,

      customers: employeeCustomers,
    };
  });
}