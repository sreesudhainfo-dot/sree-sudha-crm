import { supabase } from "../../lib/supabase";

export async function globalSearch(search: string) {
  if (!search.trim()) return [];

  const keyword = `%${search}%`;

  const [employees, marketing, leads, customers] =
    await Promise.all([
      supabase
        .from("employees")
        .select("id,full_name,employee_id")
        .or(
          `full_name.ilike.${keyword},employee_id.ilike.${keyword}`
        ),

      supabase
        .from("marketing_employees")
        .select("id,full_name,employee_id,role")
        .or(
          `full_name.ilike.${keyword},employee_id.ilike.${keyword}`
        ),

      supabase
        .from("leads")
        .select("lead_id,customer_name,assigned_employee_name,status")
        .or(
          `customer_name.ilike.${keyword},assigned_employee_name.ilike.${keyword},lead_id.ilike.${keyword}`
        ),

      supabase
        .from("customers")
        .select("customer_id,customer_name,phone")
        .or(
          `customer_name.ilike.${keyword},customer_id.ilike.${keyword},phone.ilike.${keyword}`
        ),
    ]);

  return {
    employees: employees.data ?? [],
    marketing: marketing.data ?? [],
    leads: leads.data ?? [],
    customers: customers.data ?? [],
  };
}