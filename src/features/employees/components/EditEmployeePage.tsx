import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";

import {
  getEmployee,
  type Employee,
} from "../../../services/employees";

export default function EditEmployeePage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] =
    useState<Employee | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadEmployee();
  }, []);

  async function loadEmployee() {
    try {
      if (!id) return;

      const data = await getEmployee(
        Number(id)
      );

      setEmployee(data);

    } catch (err) {
      console.error(err);

      alert("Failed to load employee.");

    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-10 shadow">
        Loading...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="rounded-xl bg-white p-10 shadow">
        Employee not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Employee
        </h1>

        <p className="text-slate-500">
          Update employee information
        </p>

      </div>

      <EmployeeForm
        employee={employee}
        onEmployeeAdded={() => {
          navigate("/employees");
        }}
      />

    </div>
  );
}