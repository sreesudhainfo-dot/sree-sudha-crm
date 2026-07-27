import { useEffect, useState } from "react";

import SearchSelect from "../../../components/common/SearchSelect";

import { getEmployees } from "../../../services/employees";

import {
  createAttendance,
  updateAttendance,
} from "../services/attendence";
import type {
  Attendance,
  AttendanceStatus,
} from "../types/Attendance";

// import type { AttendanceStatus } from "../types/Attendance";

import type { Employee } from "../../../services/employees";

interface AttendanceFormProps {
  attendance?: Attendance | null;
  onSuccess: () => void;
}
export default function AttendanceForm({
  attendance,
  onSuccess,
}: AttendanceFormProps) {

  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [employeeId, setEmployeeId] =
    useState("");

  const [attendanceDate, setAttendanceDate] =
    useState(
      new Date().toISOString().split("T")[0]
    );

  const [checkIn, setCheckIn] =
    useState("09:00");

  const [checkOut, setCheckOut] =
    useState("18:00");

  const [status, setStatus] =
    useState<AttendanceStatus>("Present");

//   const [remarks, setRemarks] =
//     useState("");

  useEffect(() => {

    loadEmployees();

  }, []);

  async function loadEmployees() {

    const data = await getEmployees();

    setEmployees(data ?? []);

  }
  useEffect(() => {

  if (!attendance) return;

  setEmployeeId(attendance.employee_id);

  setAttendanceDate(attendance.attendance_date);

  setStatus(attendance.status);

//   setRemarks(attendance.remarks ?? "");

  if (attendance.check_in) {

    const inTime = new Date(attendance.check_in)
      .toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      });

    setCheckIn(inTime);

  }

  if (attendance.check_out) {

    const outTime = new Date(attendance.check_out)
      .toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      });

    setCheckOut(outTime);

  }

}, [attendance]);
   async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  const employee = employees.find(
    (emp) => emp.employee_id === employeeId
  );

  if (!employee) {
    alert("Please select an employee.");
    return;
  }

  try {

    const checkInDateTime =
      status === "Leave"
        ? null
        : `${attendanceDate}T${checkIn}:00`;

    const checkOutDateTime =
      status === "Leave"
        ? null
        : `${attendanceDate}T${checkOut}:00`;

    const payload = {

      employee_id: employee.employee_id ?? "",

      employee_name: employee.full_name,

      attendance_date: attendanceDate,

      check_in: checkInDateTime,

      check_out: checkOutDateTime,

      status,

    //   remarks,

    };

    if (attendance) {

      await updateAttendance(
        attendance.id,
        payload
      );

      alert("Attendance updated successfully.");

    } else {

      await createAttendance(payload);

      alert("Attendance saved successfully.");

    }

    setEmployeeId("");

    setAttendanceDate(
      new Date().toISOString().split("T")[0]
    );

    setCheckIn("09:00");

    setCheckOut("18:00");

    setStatus("Present");

    // setRemarks("");

    onSuccess();

  } catch (error: any) {

    alert(error.message);

  }
}

  return (

    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-6 shadow space-y-5"
    >
              <div>

        <label className="mb-2 block text-sm font-medium">
          Employee
        </label>

        <SearchSelect
          value={employeeId}
          onChange={setEmployeeId}
          placeholder="Search Employee..."
          options={employees
            .filter((e) => e.employee_id)
            .map((e) => ({
              id: e.employee_id!,
              label: `${e.full_name} • ${e.roles?.role_name ?? ""}`,
            }))}
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          Attendance Date
        </label>

        <input
          type="date"
          value={attendanceDate}
          onChange={(e) =>
            setAttendanceDate(e.target.value)
          }
          className="w-full rounded-lg border px-3 py-2"
        />

      </div>

      <div className="grid grid-cols-2 gap-4">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Check In
          </label>

          <input
            type="time"
            value={checkIn}
            disabled={status === "Leave"}
            onChange={(e) =>
              setCheckIn(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Check Out
          </label>

          <input
            type="time"
            value={checkOut}
            disabled={status === "Leave"}
            onChange={(e) =>
              setCheckOut(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
          />

        </div>

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as AttendanceStatus
            )
          }
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="Present">
            Present
          </option>

          <option value="Leave">
            Leave
          </option>

          <option value="Half Day">
            Half Day
          </option>

        </select>

      </div>
{/* remark card */}
      {/* <div>

        <label className="mb-2 block text-sm font-medium">
          Remarks
        </label>

        <textarea
          rows={3}
          value={remarks}
          onChange={(e) =>
            setRemarks(e.target.value)
          }
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Optional remarks..."
        />

      </div> */}

      <div className="flex justify-end">

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          {attendance
  ? "Update Attendance"
  : "Save Attendance"}
        </button>

      </div>

    </form>

  );

}