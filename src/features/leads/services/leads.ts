import { supabase } from "../../../lib/supabase";
import type { Lead } from "../types/Lead";

/**
 * Get all leads
 */
export async function getLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as Lead[];
  
}

/**
 * Get one lead
 */

export async function getLeadById(id: string): Promise<Lead | null> {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Lead;
}

/**
 * Create lead
 */
export async function createLead(
  lead: Omit<Lead, "id" | "created_at" | "updated_at">
): Promise<Lead> {
  const { data, error } = await supabase
    .from("leads")
    .insert([lead])
    .select()
    .single();

  if (error) throw error;

  return data as Lead;
}

/**
 * Update lead
 */
export async function updateLead(
  id: string,
  updates: Partial<Lead>
): Promise<Lead> {
  const { data, error } = await supabase
    .from("leads")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Lead;
}

/**
 * Delete lead
 */
export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase
    .from("leads")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/**
 * Assign employee
 */
export async function assignLead(
  id: string,
  employeeId: string
): Promise<void> {
  const { error } = await supabase
    .from("leads")
    .update({
      assigned_to: employeeId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}

/**
 * Change lead status
 */
export async function changeLeadStatus(
  id: string,
  status: Lead
): Promise<void> {
  const { error } = await supabase
    .from("leads")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
}