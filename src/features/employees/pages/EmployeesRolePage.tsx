import { useEffect, useMemo, useState } from "react";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

import {
  getEmployees,
  type Employee,
} from "../../../services/employees";

import { useParams } from "react-router-dom";

export default function EmployeesRolePage() {

  const { role } = useParams();

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    const data = await getEmployees();
    setEmployees(data || []);
  }

  function handleEdit(employee: Employee) {
    setSelectedEmployee(employee);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

      <EmployeeForm
        employee={selectedEmployee}
        onEmployeeAdded={() => {
          loadEmployees();
          setSelectedEmployee(null);
        }}
      />

      <EmployeeTable
        employees={filteredEmployees}
        onEdit={handleEdit}
        onRefresh={loadEmployees}
      />

    </div>

  );

}