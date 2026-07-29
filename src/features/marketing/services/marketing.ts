import { supabase } from "../../../lib/supabase";
import type { MarketingEmployee } from "../types/MarketingEmployee";


/* --------------------------
   GET ALL
-------------------------- */

export async function getMarketingEmployees() {
  const { data, error } = await supabase
    .from("marketing_employees")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data as MarketingEmployee[];
}

/* --------------------------
   MANAGERS
-------------------------- */

export async function getManagers() {
  const { data, error } = await supabase
    .from("marketing_employees")
    .select("*")
    .eq("role", "Manager")
    .order("full_name");

  if (error) throw error;

  return data as MarketingEmployee[];
}

export async function getManagersDropdown() {
  const { data, error } = await supabase
    .from("marketing_employees")
    .select("id,employee_id,full_name")
    .eq("role", "Manager")
    .order("full_name");

  if (error) throw error;

  return data;
}

/* --------------------------
   AGENTS
-------------------------- */

export async function getAgents() {
  const { data, error } = await supabase
    .from("marketing_employees")
    .select("*")
    .eq("role", "Agent")
    .order("full_name");

  if (error) throw error;

  return data as MarketingEmployee[];
}
export async function generateAgentId(managerId: string) {
  // Get manager employee ID
  const { data: manager, error: managerError } = await supabase
    .from("marketing_employees")
    .select("employee_id")
    .eq("id", managerId)
    .single();

  if (managerError) throw managerError;

  // Get all agents under this manager
  const { data: agents, error: agentError } = await supabase
    .from("marketing_employees")
    .select("employee_id")
    .eq("role", "Agent")
    .eq("manager_id", managerId);

  if (agentError) throw agentError;

  let highest = 0;

  agents?.forEach((agent) => {
    const match = agent.employee_id.match(/AG(\d+)$/);

    if (match) {
      const number = parseInt(match[1], 10);

      if (number > highest) {
        highest = number;
      }
    }
  });

  const nextNumber = String(highest + 1).padStart(2, "0");

  return `${manager.employee_id}-AG${nextNumber}`;
}
/* --------------------------
   SUB AGENTS
-------------------------- */
export async function generateSubAgentId(agentId: string) {
  // Get selected Agent employee ID
  const { data: agent, error: agentError } = await supabase
    .from("marketing_employees")
    .select("employee_id")
    .eq("id", agentId)
    .single();

  if (agentError) throw agentError;

  // Get all Sub Agents under this Agent
  const { data: subAgents, error: subAgentError } = await supabase
    .from("marketing_employees")
    .select("employee_id")
    .eq("role", "Sub Agent")
    .eq("manager_id", agentId);

  if (subAgentError) throw subAgentError;

  let highest = 0;

  subAgents?.forEach((subAgent) => {
    const match = subAgent.employee_id.match(/SA(\d+)$/);

    if (match) {
      const number = parseInt(match[1], 10);

      if (number > highest) {
        highest = number;
      }
    }
  });

  const nextNumber = String(highest + 1).padStart(2, "0");

  return `${agent.employee_id}-SA${nextNumber}`;
}
export async function getSubAgents() {
  const { data, error } = await supabase
    .from("marketing_employees")
    .select("*")
    .eq("role", "Sub Agent")
    .order("full_name");

  if (error) throw error;

  return data as MarketingEmployee[];
}
/* --------------------------
   CREATE
-------------------------- */

export async function createMarketingEmployee(
  employee: Omit<
    MarketingEmployee,
    "id" | "created_at"
  >
) {
  const { data, error } = await supabase
    .from("marketing_employees")
    .insert(employee)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/* --------------------------
   UPDATE
-------------------------- */

export async function updateMarketingEmployee(
  id: string,
  employee: Partial<MarketingEmployee>
) {
  const { data, error } = await supabase
    .from("marketing_employees")
    .update(employee)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/* --------------------------
   DELETE
-------------------------- */

export async function deleteMarketingEmployee(
  id: string
) {
  const { error } = await supabase
    .from("marketing_employees")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/* --------------------------
   DASHBOARD
-------------------------- */

export async function getMarketingSummary() {
  const employees =
    await getMarketingEmployees();

  return {
    managers: employees.filter(
      (e) => e.role === "Manager"
    ).length,

    agents: employees.filter(
      (e) => e.role === "Agent"
    ).length,

    subAgents: employees.filter(
      (e) => e.role === "Sub Agent"
    ).length,

    total: employees.length,
  };
}

/* --------------------------
   HIERARCHY
-------------------------- */

export async function getMarketingHierarchy() {
  const { data, error } = await supabase
    .from("marketing_employees")
    .select("*")
    .order("role")
    .order("full_name");

  if (error) throw error;

  return data;
}