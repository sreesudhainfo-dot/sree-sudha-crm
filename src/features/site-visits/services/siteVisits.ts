import { supabase } from "../../../lib/supabase";
import { BaseCrudService } from "../../../services/BaseCrudService";
import type { SiteVisit } from "../types/SiteVisit";

export const siteVisitService =
  new BaseCrudService<SiteVisit>("site_visits");

export async function getSiteVisits() {
  const [{ data: visits, error: visitError }, { data: employees, error: employeeError }] =
    await Promise.all([
      supabase
        .from("site_visits")
        .select("*")
        .order("created_at", { ascending: false }),

      supabase
        .from("employees")
        .select("id, full_name"),
    ]);

  if (visitError) throw visitError;
  if (employeeError) throw employeeError;

  return (visits ?? []).map((visit: any) => ({
    ...visit,
    employeeName:
      employees?.find(
        (emp: any) => Number(emp.id) === Number(visit.assigned_employee)
      )?.full_name ?? "-",
  }));
}

export async function completeVisit(id: string) {
  return siteVisitService.update(id, {
    status: "Completed",
  });
}

export async function cancelVisit(id: string) {
  return siteVisitService.update(id, {
    status: "Cancelled",
  });
}

export async function rescheduleVisit(
  id: string,
  visit_date: string,
  visit_time: string
) {
  return siteVisitService.update(id, {
    visit_date,
    visit_time,
    status: "Rescheduled",
  });
}