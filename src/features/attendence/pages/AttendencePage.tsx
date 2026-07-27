import { useEffect, useState } from "react";

import AttendanceForm from "../components/AttendenceForm";
import AttendanceTable from "../components/AttendenceTable";
import { exportAttendanceToExcel } from "../../../utils/exportAttendance";
import EmployeeListModal from "../components/EmployeeListModal";

import EmployeeAttendanceModal from "../components/EmployeeAttendanceModal";

import {
  getAttendance,
  deleteAttendance,
  getAttendanceSummary,
} from "../services/attendence";

import { getEmployees } from "../../../services/employees";

import type { Attendance } from "../types/Attendance";

export default function AttendancePage() {
  const [currentPage, setCurrentPage] = useState(1);

const recordsPerPage = 10;

const [showEmployeeModal, setShowEmployeeModal] =
  useState(false);

const [selectedEmployee, setSelectedEmployee] =
  useState<Attendance | null>(null);

  const [attendance, setAttendance] =
    useState<Attendance[]>([]);
const [search, setSearch] = useState("");

const [statusFilter, setStatusFilter] =
  useState("All");

const [dateFilter, setDateFilter] =
  useState("");
  const [editingAttendance, setEditingAttendance] =
    useState<Attendance | null>(null);

  const [summary, setSummary] = useState({
 
    totalEmployees: 0,
    present: 0,
    leave: 0,
    notMarked: 0,
  });
// Dashboard Card Modal States
const [cardTitle, setCardTitle] = useState("");

const [cardEmployees, setCardEmployees] = useState<any[]>([]);

const [showCardModal, setShowCardModal] = useState(false);
  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

    try {

      const attendanceData =
        await getAttendance();

      const summaryData =
        await getAttendanceSummary();

      const employees =
        await getEmployees();

      setAttendance(attendanceData);

      setSummary({

  totalEmployees: employees.length,

  present: summaryData.present,

  leave: summaryData.leave,

  notMarked:
    employees.length -
    summaryData.present -
    summaryData.leave -
    summaryData.halfDay,

});

    } catch (error) {

      console.error(error);

    }

  }
    async function handleDelete(id: string) {

    const confirmDelete = window.confirm(
      "Delete this attendance record?"
    );

    if (!confirmDelete) return;

    try {

      await deleteAttendance(id);

      await loadData();

      alert("Attendance deleted successfully.");

    } catch (error) {

      console.error(error);

      alert("Failed to delete attendance.");

    }

  }

  function handleEdit(
    attendance: Attendance
  ) {

    setEditingAttendance(attendance);

    // Part 3:
    // We'll pass this to AttendanceForm
    // to load values for editing.

  }
  async function openCard(title: string) {
    const today = new Date().toLocaleDateString("en-CA", {
  timeZone: "Asia/Kolkata",
});

const todayAttendance = attendance.filter(
  (a) => a.attendance_date === today
);
console.log("Card clicked:", title);

  if (title === "Total Employees") {

    const employees = await getEmployees();

    setCardEmployees(
      employees.map((e) => ({
        employee_id: e.employee_id,
        full_name: e.full_name,
      }))
    );

  } else if (title === "Present Today") {

    setCardEmployees(
      todayAttendance
        .filter((a) => a.status === "Present")
        .map((a) => ({
          employee_id: a.employee_id,
          employee_name: a.employee_name,
          status: a.status,
        }))
    );

  } else if (title === "On Leave") {

    setCardEmployees(
      todayAttendance
        .filter((a) => a.status === "Leave")
        .map((a) => ({
          employee_id: a.employee_id,
          employee_name: a.employee_name,
          status: a.status,
        }))
    );

  } else if (title === "Not Marked") {

    const employees = await getEmployees();

    const markedIds = todayAttendance.map(
      (a) => a.employee_id
    );

    setCardEmployees(
      employees
        .filter(
          (e) => !markedIds.includes(e.employee_id ?? "")
        )
        .map((e) => ({
          employee_id: e.employee_id,
          full_name: e.full_name,
        }))
    );

  }

  setCardTitle(title);

  setShowCardModal(true);

}
const filteredAttendance = attendance.filter((record) => {

  const matchesEmployee =

    record.employee_name
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    record.employee_id
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =

    statusFilter === "All"

      ||

    record.status === statusFilter;

  const matchesDate =

    !dateFilter

      ||

    record.attendance_date === dateFilter;

  return (

    matchesEmployee

    &&

    matchesStatus

    &&

    matchesDate

  );

});
const totalPages = Math.ceil(
  filteredAttendance.length / recordsPerPage
);

const paginatedAttendance =
  filteredAttendance.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

function handleView(record: Attendance) {
  setSelectedEmployee(record);
  setShowEmployeeModal(true);
}
<EmployeeListModal
  open={showCardModal}
  title={cardTitle}
  employees={cardEmployees}
  onClose={() => setShowCardModal(false)}
/>
  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

  <div>

    <h1 className="text-3xl font-bold">
      Attendance
    </h1>

    <p className="text-slate-500">
      Manage employee attendance records
    </p>

  </div>

  <button
    // onClick={() => exportAttendanceToExcel(attendance)}
    onClick={() => exportAttendanceToExcel(filteredAttendance)}
    className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700"
  >
    📥 Export Excel
  </button>

</div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

        <div
  onClick={() => openCard("Total Employees")}
  className="cursor-pointer rounded-xl bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-lg"
>

          <p className="text-sm text-slate-500">
            Total Employees
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {summary.totalEmployees}
          </h2>

        </div>

        <div
  onClick={() => openCard("Present Today")}
  className="cursor-pointer rounded-xl bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-lg"
>

          <p className="text-sm text-slate-500">
            Present Today
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {summary.present}
          </h2>

        </div>

        <div
  onClick={() => openCard("On Leave")}
  className="cursor-pointer rounded-xl bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-lg"
>

          <p className="text-sm text-slate-500">
            On Leave
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {summary.leave}
          </h2>

        </div>

        <div
  onClick={() => openCard("Not Marked")}
  className="cursor-pointer rounded-xl bg-white p-5 shadow transition hover:-translate-y-1 hover:shadow-lg"
>

          <p className="text-sm text-slate-500">
            Not Marked
          </p>

          <h2 className="mt-2 text-3xl font-bold text-amber-600">
            {summary.notMarked}
          </h2>

        </div>

      </div>

      {/* <AttendanceForm
        onSuccess={loadData}
      />

      <AttendanceTable
        attendance={attendance}
        onEdit={handleEdit}
        onDelete={handleDelete}
      /> */}
          <AttendanceForm
    onSuccess={loadData}
/>
<div className="rounded-xl bg-white p-4 shadow">

  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

    {/* Search */}

    <div>

      <label className="mb-1 block text-sm font-medium text-slate-600">
        Employee / EMP ID
      </label>

      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
      />

    </div>

    {/* Date */}

    <div>

      <label className="mb-1 block text-sm font-medium text-slate-600">
        Date
      </label>

      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
      />

    </div>

    {/* Status */}

    <div>

      <label className="mb-1 block text-sm font-medium text-slate-600">
        Status
      </label>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
      >

        <option value="All">All</option>

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

    {/* Clear */}

    <div className="flex items-end">

      <button
        onClick={() => {

          setSearch("");

          setDateFilter("");

          setStatusFilter("All");

        }}
        className="w-full rounded-lg bg-slate-700 px-4 py-2 font-medium text-white hover:bg-slate-800"
      >
        Clear Filters
      </button>

    </div>

  </div>

</div>
      <AttendanceTable
  attendance={paginatedAttendance}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
<div className="flex items-center justify-between rounded-xl bg-white p-4 shadow">

  <p className="text-sm text-slate-600">

    Showing

    {" "}

    {(currentPage - 1) * recordsPerPage + 1}

    -

    {Math.min(
      currentPage * recordsPerPage,
      filteredAttendance.length
    )}

    {" "}of{" "}

    {filteredAttendance.length}

  </p>

  <div className="flex gap-2">

    <button
      disabled={currentPage === 1}
      onClick={() =>
        setCurrentPage(currentPage - 1)
      }
      className="rounded-lg border px-4 py-2 disabled:opacity-40"
    >
      Previous
    </button>

    <button
      disabled={currentPage === totalPages}
      onClick={() =>
        setCurrentPage(currentPage + 1)
      }
      className="rounded-lg border px-4 py-2 disabled:opacity-40"
    >
      Next
    </button>

  </div>

</div>
{editingAttendance && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

    <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">

        <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
                Edit Attendance
            </h2>

            <button
                onClick={() =>
                    setEditingAttendance(null)
                }
                className="text-2xl text-slate-500 hover:text-black"
            >
                ×
            </button>

        </div>

        <AttendanceForm
            attendance={editingAttendance}
            onSuccess={() => {

                setEditingAttendance(null);

                loadData();

            }}
        />

    </div>

</div>

)}
<EmployeeListModal
  open={showCardModal}
  title={cardTitle}
  employees={cardEmployees}
  onClose={() => setShowCardModal(false)}
/>

<EmployeeAttendanceModal
  open={showEmployeeModal}
  employeeId={selectedEmployee?.employee_id ?? ""}
  employeeName={selectedEmployee?.employee_name ?? ""}
  attendance={
    selectedEmployee
      ? attendance.filter(
          (a) =>
            a.employee_id ===
            selectedEmployee.employee_id
        )
      : []
  }
  onClose={() => {
    setShowEmployeeModal(false);
    setSelectedEmployee(null);
  }}
/>
    </div>

  );

}