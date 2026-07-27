import { supabase } from "../lib/supabase";

export async function getRoles() {
  const { data, error } = await supabase
    .from("roles")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) throw error;

  return data;
}