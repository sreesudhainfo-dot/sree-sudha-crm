import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { Attendance } from "../features/attendence/types/Attendance";

export function exportAttendanceToExcel(
  attendance: Attendance[]
) {
  const data = attendance.map((record) => ({
    "Employee ID": record.employee_id,
    "Employee Name": record.employee_name,
    Date: record.attendance_date,
    "Check In": record.check_in
      ? new Date(record.check_in).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      : "",
    "Check Out": record.check_out
      ? new Date(record.check_out).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      : "",
    Status: record.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Attendance"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(
    file,
    `Attendance_${new Date()
      .toISOString()
      .split("T")[0]}.xlsx`
  );
}