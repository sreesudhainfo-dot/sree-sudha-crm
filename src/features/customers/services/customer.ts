import { supabase } from "../../../lib/supabase";
import type { Customer } from "../types/Customer";

/**
 * Get all customers
 */
export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
  .from("customers")
  .select(`
    *,
    employees!customers_assigned_to_fkey (
      full_name
    )
  `)
  .order("created_at", { ascending: false });

console.log(data);

  if (error) throw error;

  return (data ?? []) as Customer[];
}

/**
 * Get customer by ID
 */
export async function getCustomerById(
  id: string
): Promise<Customer | null> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Customer;
}

/**
 * Create customer
 */
export async function createCustomer(
  customer: Omit<Customer, "id" | "created_at" | "updated_at">
): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .insert([customer])
    .select()
    .single();

  if (error) throw error;

  return data as Customer;
}

/**
 * Update customer
 */
export async function updateCustomer(
  id: string,
  updates: Partial<Customer>
): Promise<Customer> {

  console.log("Updating:", updates);

  const { data, error } = await supabase
    .from("customers")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

 console.log("assigned_to after update:", data?.[0]?.assigned_to);

  if (error) {
    console.error(error);
    throw error;
  }

  return data![0] as Customer;
}

/**
 * Delete customer
 */
export async function deleteCustomer(
  id: string
): Promise<void> {
  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id);

  if (error) throw error;
}