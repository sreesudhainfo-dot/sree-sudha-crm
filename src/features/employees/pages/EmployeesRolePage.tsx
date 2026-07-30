import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import EmployeeTable from "../components/EmployeeTable";

import {
  getEmployees,
  type Employee,
} from "../../../services/employees";

export default function EmployeesRolePage() {
  const { role } = useParams();

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    const data = await getEmployees();
    setEmployees(data || []);
  }

  const filteredEmployees = useMemo(() => {
    if (!role) return employees;

    const roleName = role
      .replace(/-/g, " ")
      .toLowerCase();

    return employees.filter(
      (employee) =>
        employee.roles?.role_name?.toLowerCase() === roleName
    );
  }, [employees, role]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold capitalize">
          {role?.replace(/-/g, " ")}
        </h1>

        <p className="text-slate-500">
          Department Employees
        </p>
      </div>

      <EmployeeTable
        employees={filteredEmployees}
        onEdit={() => {}}
        onRefresh={loadEmployees}
      />
    </div>
  );
}