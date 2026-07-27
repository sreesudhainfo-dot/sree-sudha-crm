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

/* --------------------------
   SUB AGENTS
-------------------------- */

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