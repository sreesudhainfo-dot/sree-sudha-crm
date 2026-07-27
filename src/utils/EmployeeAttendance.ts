import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { Attendance } from "../features/attendence/types/Attendance";

export function exportEmployeeAttendance(
  employeeName: string,
  attendance: Attendance[]
) {

  const rows = attendance.map((record) => ({

    Date: record.attendance_date,

    "Check In": record.check_in
      ? new Date(record.check_in).toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
        )
      : "-",

    "Check Out": record.check_out
      ? new Date(record.check_out).toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
        )
      : "-",

    Status: record.status,

  }));

  const worksheet =
    XLSX.utils.json_to_sheet(rows);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Attendance"
  );

  const buffer =
    XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

  saveAs(
    new Blob([buffer]),
    `${employeeName}_Attendance.xlsx`
  );
}