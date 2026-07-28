import { useMemo, useState } from "react";

import HierarchyNode from "./HirerarchyNode";
import type { MarketingEmployee } from "../types/MarketingEmployee";

interface HierarchyTreeProps {
  employees: MarketingEmployee[];
}

export default function HierarchyTree({
  employees,
}: HierarchyTreeProps) {
  const [search, setSearch] = useState("");

  const managers = employees.filter(
    (e) => e.role === "Manager"
  );

  const agents = employees.filter(
    (e) => e.role === "Agent"
  );

  const subAgents = employees.filter(
    (e) => e.role === "Sub Agent"
  );

  const keyword = search.trim().toLowerCase();

  const visibleManagers = useMemo(() => {
    if (!keyword) return managers;

    return managers.filter((manager) => {
      // manager matches
      if (
        manager.full_name.toLowerCase().includes(keyword) ||
        manager.employee_id.toLowerCase().includes(keyword)
      )
        return true;

      // any agent matches
      const managerAgents = agents.filter(
        (a) => a.manager_id === manager.id
      );

      if (
        managerAgents.some(
          (a) =>
            a.full_name.toLowerCase().includes(keyword) ||
            a.employee_id.toLowerCase().includes(keyword)
        )
      )
        return true;

      // any sub agent matches
      return managerAgents.some((agent) =>
        subAgents.some(
          (sub) =>
            sub.manager_id === agent.id &&
            (sub.full_name
              .toLowerCase()
              .includes(keyword) ||
              sub.employee_id
                .toLowerCase()
                .includes(keyword))
        )
      );
    });
  }, [keyword, managers, agents, subAgents]);
  return (
  <div className="space-y-6">

    <div className="rounded-xl bg-white p-5 shadow">

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Manager, Agent or Sub Agent..."
        className="w-full rounded-lg border px-4 py-3"
      />

    </div>

    <div className="space-y-6">

      {visibleManagers.map((manager) => {

        const managerMatches =
          keyword &&
          (
            manager.full_name
              .toLowerCase()
              .includes(keyword) ||
            manager.employee_id
              .toLowerCase()
              .includes(keyword)
          );

        const visibleAgents = agents.filter((agent) => {

          if (agent.manager_id !== manager.id)
            return false;

          if (!keyword) return true;

          const agentMatches =
            agent.full_name
              .toLowerCase()
              .includes(keyword) ||
            agent.employee_id
              .toLowerCase()
              .includes(keyword);

          const hasMatchingSubAgent =
            subAgents.some(
              (sub) =>
                sub.manager_id === agent.id &&
                (
                  sub.full_name
                    .toLowerCase()
                    .includes(keyword) ||
                  sub.employee_id
                    .toLowerCase()
                    .includes(keyword)
                )
            );

          return (
            managerMatches ||
            agentMatches ||
            hasMatchingSubAgent
          );
        });

        return (
          <HierarchyNode
            key={manager.id}
            employee={manager}
            defaultExpanded={!!keyword}
          >
                        {visibleAgents.map((agent) => {

              const agentMatches =
                keyword &&
                (
                  agent.full_name
                    .toLowerCase()
                    .includes(keyword) ||
                  agent.employee_id
                    .toLowerCase()
                    .includes(keyword)
                );

              const visibleSubAgents =
                subAgents.filter((sub) => {

                  if (sub.manager_id !== agent.id)
                    return false;

                  if (!keyword)
                    return true;

                  return (
                    managerMatches ||
                    agentMatches ||
                    sub.full_name
                      .toLowerCase()
                      .includes(keyword) ||
                    sub.employee_id
                      .toLowerCase()
                      .includes(keyword)
                  );
                });

              return (
                <HierarchyNode
                  key={agent.id}
                  employee={agent}
                  defaultExpanded={!!keyword}
                >

                  {visibleSubAgents.map((sub) => (

                    <HierarchyNode
                      key={sub.id}
                      employee={sub}
                    />

                  ))}

                </HierarchyNode>
              );

            })}

          </HierarchyNode>
        );

      })}

      {visibleManagers.length === 0 && (

        <div className="rounded-xl bg-white p-10 text-center text-slate-500 shadow">

          No employees found.

        </div>

      )}

    </div>

  </div>
);
}