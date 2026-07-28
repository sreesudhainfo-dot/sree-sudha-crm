import { useState } from "react";
import {
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";

import type { MarketingEmployee } from "../types/MarketingEmployee";

interface HierarchyNodeProps {
  employee: MarketingEmployee;
  children?: React.ReactNode;

  // auto expand while searching
  defaultExpanded?: boolean;
}

export default function HierarchyNode({
  employee,
  children,
  defaultExpanded = false,
}: HierarchyNodeProps) {
  const hasChildren = !!children;

  const [expanded, setExpanded] =
    useState(defaultExpanded);

  const roleColors = {
    Manager: "bg-blue-600 text-white",
    Agent: "bg-green-600 text-white",
    "Sub Agent": "bg-slate-700 text-white",
  };

  return (
    <div className="mb-4">

      {/* Card */}

      <div
        onClick={() => {
          if (hasChildren) {
            setExpanded(!expanded);
          }
        }}
        className={`flex cursor-pointer items-center justify-between rounded-xl px-5 py-4 shadow transition hover:shadow-lg ${
          roleColors[
            employee.role as keyof typeof roleColors
          ]
        }`}
      >

        <div>

          <div className="font-semibold text-lg">
            {employee.full_name}
          </div>

          <div className="text-sm opacity-90">
            {employee.role}
          </div>

          <div className="text-xs opacity-80">
            {employee.employee_id}
          </div>

        </div>

        {hasChildren && (
          expanded
            ? <FaChevronDown size={16} />
            : <FaChevronRight size={16} />
        )}

      </div>

      {/* Children */}

      {hasChildren && expanded && (
        <div className="ml-8 mt-3 border-l-2 border-slate-300 pl-6">
          {children}
        </div>
      )}

    </div>
  );
}