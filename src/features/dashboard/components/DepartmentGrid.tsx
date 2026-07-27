import DepartmentCard from "./DepartmentCard";
import type { Employee } from "../../../services/employees";

interface Props {
  employees: Employee[];
}

export default function DepartmentGrid({
  employees,
}: Props) {
  const departments = [
    {
      role: "Manager",
      color: "bg-blue-600",
    },
    {
      role: "Marketing",
      color: "bg-green-600",
    },
    {
      role: "Digital Marketing",
      color: "bg-purple-600",
    },
    {
      role: "Telecaller",
      color: "bg-orange-500",
    },
    {
      role: "Reception",
      color: "bg-pink-600",
    },
    {
      role: "Accounts",
      color: "bg-indigo-600",
    },
    {
      role: "Office Boy",
      color: "bg-slate-700",
    },
  ];

  return (
    <div className="space-y-5">

      <div>

        <h2 className="text-2xl font-bold">
          Employee Departments
        </h2>

        <p className="text-slate-500">
          Department wise employee overview
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {departments.map((department) => {

          const departmentEmployees =
            employees.filter(
              (employee) =>
                employee.roles?.role_name ===
                department.role
            );

          return (
            <DepartmentCard
              key={department.role}
              role={department.role}
              color={department.color}
              total={
                departmentEmployees.length
              }
              active={
                departmentEmployees.filter(
                  (employee) =>
                    employee.is_active
                ).length
              }
              inactive={
                departmentEmployees.filter(
                  (employee) =>
                    !employee.is_active
                ).length
              }
            />
          );

        })}

      </div>

    </div>
  );
}