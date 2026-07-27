import { useEffect, useState } from "react";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

import {
  getEmployees,
  type Employee,
} from "../../../services/employees";


export default function EmployeesPage() {

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);


  async function loadEmployees() {

    try {

      const data = await getEmployees();

      setEmployees(data || []);

    } catch (error) {

      console.error(error);

      alert("Failed to load employees");

    }

  }


  useEffect(() => {

    loadEmployees();

  }, []);



  function handleEdit(employee: Employee) {

    setSelectedEmployee(employee);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }



  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-3xl font-bold">
          Employees
        </h1>

        <p className="text-slate-500">
          Manage company employees and roles
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

        employees={employees}

        onEdit={handleEdit}

        onRefresh={loadEmployees}

      />


    </div>

  );

}