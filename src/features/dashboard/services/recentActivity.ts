import { supabase } from "../../../lib/supabase";

function isWithinLast7Days(date: string) {
  const now = new Date();
  const recordDate = new Date(date);

  const diff =
    now.getTime() - recordDate.getTime();

  const days = diff / (1000 * 60 * 60 * 24);

  return days <= 7;
}

export async function getRecentActivities() {
  const [
    employeesRes,
    leadsRes,
    customersRes,
    visitsRes,
  ] = await Promise.all([
    supabase
      .from("employees")
      .select("id, full_name, created_at")
      .order("created_at", {
        ascending: false,
      }),

    supabase
      .from("leads")
      .select(`
        id,
        customer_name,
        assigned_employee_name,
        created_at
      `)
      .order("created_at", {
        ascending: false,
      }),

    supabase
      .from("customers")
      .select(`
        id,
        customer_name,
        booking_amount,
        created_at
      `)
      .order("created_at", {
        ascending: false,
      }),

    supabase
      .from("site_visits")
      .select(`
        id,
        customer_name,
        visit_date,
        created_at
      `)
      .order("created_at", {
        ascending: false,
      }),
  ]);

  const activities: any[] = [];

  // Employees
  (employeesRes.data ?? []).forEach((emp: any) => {
    activities.push({
      type: "employee",
      title: "New Employee Added",
      description: `${emp.full_name} joined the company`,
      date: emp.created_at,
    });
  });

  // Leads
  (leadsRes.data ?? []).forEach((lead: any) => {
    activities.push({
      type: "lead",
      title: "New Lead Assigned",
      description: `${lead.customer_name} assigned to ${
        lead.assigned_employee_name ??
        "Unassigned"
      }`,
      date: lead.created_at,
    });
  });

  // Customers / Bookings
  (customersRes.data ?? []).forEach(
    (customer: any) => {
      const booked =
        Number(
          customer.booking_amount ?? 0
        ) > 0;

      activities.push({
        type: booked
          ? "booking"
          : "customer",
        title: booked
          ? "Booking Confirmed"
          : "Customer Registered",
        description: booked
          ? `${customer.customer_name} booked a plot`
          : `${customer.customer_name} registered`,
        date: customer.created_at,
      });
    }
  );

  // Site Visits
  (visitsRes.data ?? []).forEach(
    (visit: any) => {
      activities.push({
        type: "visit",
        title: "Site Visit Scheduled",
        description: `${visit.customer_name}`,
        date: visit.created_at,
      });
    }
  );

  return activities
    .filter((activity) =>
      isWithinLast7Days(activity.date)
    )
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 15);
}