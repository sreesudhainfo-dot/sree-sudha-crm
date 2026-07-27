import { supabase } from "../lib/supabase";

export interface Employee {
  id?: number;
  employee_id?: string;

  full_name: string;
  personal_phone: string;
  company_phone: string;
  email: string;

  role_id: number;

  joining_date?: string;
  is_active?: boolean;

  roles?: {
    role_name: string;
  };
}

export async function getEmployees() {
  const { data, error } = await supabase
    .from("employees")
    .select(`
      *,
      roles (
        role_name
      )
    `)
    .order("id", { ascending: true });

  if (error) throw error;

  return data;
}

export async function getEmployee(id: number) {
  const { data, error } = await supabase
    .from("employees")
    .select(`
      *,
      roles (
        role_name
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function addEmployee(employee: Employee) {
  const { data, error } = await supabase
    .from("employees")
    .insert(employee)
    .select();

  if (error) throw error;

  return data;
}

export async function updateEmployee(
  id: number,
  employee: Employee
) {
  const { data, error } = await supabase
    .from("employees")
    .update({
      full_name: employee.full_name,
      personal_phone: employee.personal_phone,
      company_phone: employee.company_phone,
      email: employee.email,
      role_id: employee.role_id,
    })
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function deactivateEmployee(id: number) {
  const { data, error } = await supabase
    .from("employees")
    .update({
      is_active: false,
    })
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function activateEmployee(id: number) {
  const { data, error } = await supabase
    .from("employees")
    .update({
      is_active: true,
    })
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}