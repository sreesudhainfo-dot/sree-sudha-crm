import { supabase } from "../lib/supabase";

export async function getDashboardData() {

  const [
    employees,
    leads,
  ] = await Promise.all([

    supabase
      .from("employees")
      .select(`
        *,
        roles(role_name)
      `),

    supabase
      .from("leads")
      .select("*"),

  ]);

  if (employees.error) throw employees.error;

  if (leads.error) throw leads.error;

  return {

    employees: employees.data ?? [],

    leads: leads.data ?? [],

  };

}