import type { MarketingEmployee } from "../types/MarketingEmployee";

interface HierarchyNodeProps {
  employee: MarketingEmployee;
  children?: React.ReactNode;
}

export default function HierarchyNode({
  employee,
  children,
}: HierarchyNodeProps) {
  const roleColors = {
    Manager: "bg-blue-600 text-white",
    Agent: "bg-green-600 text-white",
    "Sub Agent": "bg-slate-600 text-white",
  };

  return (
    <div className="mb-4">
      <div
        className={`rounded-xl px-5 py-3 shadow ${
          roleColors[
            employee.role as keyof typeof roleColors
          ] ?? "bg-gray-600 text-white"
        }`}
      >
        <div className="font-semibold">
          {employee.full_name}
        </div>

        <div className="text-sm opacity-90">
          {employee.role}
        </div>

        <div className="text-xs opacity-80">
          {employee.employee_id}
        </div>
      </div>

      {children && (
        <div className="ml-10 mt-3 border-l-2 border-slate-300 pl-5">
          {children}
        </div>
      )}
    </div>
  );
}