import { BaseCrudService } from "../../../services/BaseCrudService";
import type { LeadPool } from "../types/LeadPools";

class LeadPoolService extends BaseCrudService<LeadPool> {
  constructor() {
    super("leads");
  }

  async getLeadByLeadId(leadId: string) {
    const leads = await this.getAll();

    return leads.find((lead) => lead.lead_id === leadId) ?? null;
  }

  async getByStatus(status: LeadPool["status"]) {
    const leads = await this.getAll();

    return leads.filter((lead) => lead.status === status);
  }

  async getBySource(source: LeadPool["source"]) {
    const leads = await this.getAll();

    return leads.filter((lead) => lead.source === source);
  }

  async search(search: string) {
    const leads = await this.getAll();

    const keyword = search.toLowerCase();

    return leads.filter(
      (lead) =>
        lead.customer_name.toLowerCase().includes(keyword) ||
        lead.phone.includes(keyword) ||
        lead.lead_id.toLowerCase().includes(keyword)
    );
  }

  async assignTelecaller(id: string, telecaller: string) {
    return this.update(id, {
      assigned_telecaller: telecaller,
    });
  }

  async assignMarketer(id: string, marketer: string) {
    return this.update(id, {
      assigned_marketer: marketer,
    });
  }

  async changeStatus(id: string, status: LeadPool["status"]) {
    return this.update(id, {
      status,
    });
  }
}

export const leadPoolService = new LeadPoolService();