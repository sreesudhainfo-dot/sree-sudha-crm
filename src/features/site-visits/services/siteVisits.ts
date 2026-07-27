import { BaseCrudService } from "../../../services/BaseCrudService";
import type { SiteVisit } from "../types/SiteVisit";

export const siteVisitService = new BaseCrudService<SiteVisit>("site_visits");

// Optional helper functions

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