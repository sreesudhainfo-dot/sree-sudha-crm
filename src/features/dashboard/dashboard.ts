import { supabase } from "../../lib/supabase";

export async function getDashboardSummary() {
  const today = new Date().toISOString().split("T")[0];

  const [
    { count: attendanceCount },
    { count: leadsCount },
    { count: visitCount },
    { count: bookingCount },
  ] = await Promise.all([
    supabase
      .from("attendance")
      .select("*", { count: "exact", head: true })
      .eq("date", today)
      .eq("status", "Present"),

    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", `${today}T00:00:00`)
      .lte("created_at", `${today}T23:59:59`),

    supabase
      .from("site_visits")
      .select("*", { count: "exact", head: true })
      .gte("created_at", `${today}T00:00:00`)
      .lte("created_at", `${today}T23:59:59`),

    supabase
      .from("customers")
      .select("*", { count: "exact", head: true })
      .gte("created_at", `${today}T00:00:00`)
      .lte("created_at", `${today}T23:59:59`),
  ]);

  return {
    attendance: attendanceCount ?? 0,
    leads: leadsCount ?? 0,
    visits: visitCount ?? 0,
    bookings: bookingCount ?? 0,
  };
}

export async function getRecentActivities() {
  const activities: any[] = [];

  const { data: employees } = await supabase
    .from("marketing_employees")
    .select("full_name, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  employees?.forEach((emp) => {
    activities.push({
      type: "employee",
      title: "New Employee Added",
      description: `${emp.full_name} joined Marketing Department`,
      created_at: emp.created_at,
    });
  });

  const { data: leads } = await supabase
    .from("leads")
    .select("customer_name, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  leads?.forEach((lead) => {
    activities.push({
      type: "lead",
      title: "New Lead",
      description: `${lead.customer_name} added as Lead`,
      created_at: lead.created_at,
    });
  });

  const { data: visits } = await supabase
    .from("site_visits")
    .select("customer_name, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  visits?.forEach((visit) => {
    activities.push({
      type: "visit",
      title: "Site Visit Scheduled",
      description: `${visit.customer_name} visit scheduled`,
      created_at: visit.created_at,
    });
  });

  const { data: customers } = await supabase
    .from("customers")
    .select("customer_name, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  customers?.forEach((customer) => {
    activities.push({
      type: "customer",
      title: "Customer Registered",
      description: `${customer.customer_name} registered`,
      created_at: customer.created_at,
    });
  });

  activities.sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  );

  return activities.slice(0, 10);
}