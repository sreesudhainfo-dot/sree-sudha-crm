import { supabase } from "../../../lib/supabase";

export async function getMarketingEmployees() {
  const { data, error } = await supabase
    .from("marketing_employees")
    .select("*")
    .order("full_name");

  if (error) throw error;

  return data ?? [];
}

export async function getCustomers() {
  const { data, error } = await supabase
    .from("customers")
    .select("*");

  if (error) throw error;

  return data ?? [];
}

export async function getLeads() {
  const { data, error } = await supabase
    .from("leads")
    .select("*");

  if (error) throw error;

  return data ?? [];
}

export async function getAttendance() {
  const { data, error } = await supabase
    .from("attendance")
    .select("*");

  if (error) throw error;

  return data ?? [];
}
export async function getEmployeePerformance() {
  const [
    employees,
    customers,
    leads,
    attendance,
  ] = await Promise.all([
    getMarketingEmployees(),
    getCustomers(),
    getLeads(),
    getAttendance(),
  ]);

  return employees.map((employee: any) => {
    const employeeLeads = leads.filter(
      (lead: any) =>
        lead.assigned_to === employee.id
    );

    const employeeCustomers =
      customers.filter(
        (customer: any) =>
          customer.assigned_to === employee.id
      );

    const employeeAttendance =
      attendance.filter(
        (item: any) =>
          item.employee_id === employee.id
      );

    const presentDays =
      employeeAttendance.filter(
        (item: any) =>
          item.status === "Present"
      ).length;

    const bookings =
      employeeCustomers.filter(
        (customer: any) =>
          customer.booking_amount
      );

    const bookingAmount =
      bookings.reduce(
        (sum: number, customer: any) =>
          sum +
          Number(
            customer.booking_amount ?? 0
          ),
        0
      );

    return {
      employee,

      attendance: presentDays,

      totalLeads: employeeLeads.length,

      totalCustomers:
        employeeCustomers.length,

      totalBookings:
        bookings.length,

      bookingAmount,

      customers: employeeCustomers,
    };
  });
}