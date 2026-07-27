import { useNavigate } from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";

export default function AddEmployeePage() {

  const navigate = useNavigate();

  return (

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Add Employee
          </h1>

          <p className="text-slate-500">
            Create a new employee
          </p>

        </div>

        <button
          onClick={() => navigate("/employees")}
          className="rounded-lg border px-5 py-2 hover:bg-slate-100"
        >
          Back
        </button>

      </div>

      <EmployeeForm
        employee={null}
        onEmployeeAdded={() => {
          navigate("/employees");
        }}
      />

    </div>

  );

}