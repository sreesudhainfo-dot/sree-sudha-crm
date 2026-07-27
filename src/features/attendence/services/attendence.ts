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
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("attendance")
    .select("*");

  if (error) throw error;

  const todayAttendance = (data ?? []).filter((item: any) => {
    console.log(
      "DB Date:",
      item.attendance_date,
      "Today:",
      today,
      "Match:",
      String(item.attendance_date).substring(0, 10) === today
    );

    return (
      String(item.attendance_date).substring(0, 10) === today
    );
  });

  console.log("Today's Records:", todayAttendance);
console.log({
  present: todayAttendance.filter(
    (item: any) => item.status?.trim() === "Present"
  ).length,

  leave: todayAttendance.filter(
    (item: any) => item.status?.trim() === "Leave"
  ).length,

  halfDay: todayAttendance.filter(
    (item: any) => item.status?.trim() === "Half Day"
  ).length,
});
  return {
    present: todayAttendance.filter(
      (item: any) => item.status?.trim() === "Present"
    ).length,

    leave: todayAttendance.filter(
      (item: any) => item.status?.trim() === "Leave"
    ).length,

    halfDay: todayAttendance.filter(
      (item: any) => item.status?.trim() === "Half Day"
    ).length,
  };
}