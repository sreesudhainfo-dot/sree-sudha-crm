import { supabase } from "../../../lib/supabase";
import type { Attendance } from "../types/Attendance";

/**
 * Get All Attendance
 */
export async function getAttendance(): Promise<Attendance[]> {
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .order("attendance_date", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []) as Attendance[];
}

/**
 * Create Attendance
 */
export async function createAttendance(
  attendance: Omit<
    Attendance,
    "id" | "created_at" | "updated_at"
  >
): Promise<Attendance> {
  // Prevent duplicate attendance
  const { data: existing } = await supabase
    .from("attendance")
    .select("id")
    .eq("employee_id", attendance.employee_id)
    .eq("attendance_date", attendance.attendance_date)
    .maybeSingle();

  if (existing) {
    throw new Error(
      "Attendance already marked for this employee."
    );
  }

  const { data, error } = await supabase
    .from("attendance")
    .insert([attendance])
    .select()
    .single();

  if (error) throw error;

  return data as Attendance;
}

/**
 * Update Attendance
 */
export async function updateAttendance(
  id: string,
  updates: Partial<Attendance>
): Promise<Attendance> {
  const { data, error } = await supabase
    .from("attendance")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Attendance;
}

/**
 * Delete Attendance
 */
export async function deleteAttendance(
  id: string
): Promise<void> {
  const { error } = await supabase
    .from("attendance")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/**
 * Attendance Summary
 */
export async function getAttendanceSummary() {

  const today = new Date()
    .toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

  const { data, error } = await supabase
    .from("attendance")
    .select("status")
    .eq("attendance_date", today);

  if (error) throw error;

  return {
    present: data.filter(
      (a) => a.status === "Present"
    ).length,

    leave: data.filter(
      (a) => a.status === "Leave"
    ).length,

    halfDay: data.filter(
      (a) => a.status === "Half Day"
    ).length,
  };
}