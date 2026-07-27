import { supabase } from "../../lib/supabase";

export async function getDashboardStats() {
  const [
    employees,
    leads,
    bookings,
    siteVisits,
  ] = await Promise.all([
    supabase.from("employees").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "Booked"),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "Visited"),
  ]);

  return {
    employees: employees.count ?? 0,
    leads: leads.count ?? 0,
    bookings: bookings.count ?? 0,
    siteVisits: siteVisits.count ?? 0,
  };
}