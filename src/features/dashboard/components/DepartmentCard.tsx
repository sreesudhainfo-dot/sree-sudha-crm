import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaUsers,
} from "react-icons/fa";

interface Props {
  role: string;
  total: number;
  active: number;
  inactive: number;
  color: string;
}

export default function DepartmentCard({
  role,
  total,
  active,
  inactive,
  color,
}: Props) {

  const navigate = useNavigate();

  return (

    <div
      onClick={() =>
        navigate(
`/employees/${role
  .toLowerCase()
  .replace(/\s+/g, "-")}`
)
      }
      className="cursor-pointer rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >

      <div className="flex items-center justify-between">

        <div
          className={`rounded-xl ${color} p-4 text-white`}
        >
          <FaUsers size={24} />
        </div>

        <FaArrowRight className="text-slate-400" />

      </div>

      <h2 className="mt-6 text-xl font-bold">

        {role}

      </h2>

      <div className="mt-5 space-y-2">

        <div className="flex justify-between">

          <span className="text-gray-500">
            Employees
          </span>

          <span className="font-bold">
            {total}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-green-600">
            Active
          </span>

          <span className="font-semibold">
            {active}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-red-600">
            Inactive
          </span>

          <span className="font-semibold">
            {inactive}
          </span>

        </div>

      </div>

    </div>

  );

}