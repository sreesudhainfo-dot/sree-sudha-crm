import HierarchyNode from "./HirerarchyNode";
import type { MarketingEmployee } from "../types/MarketingEmployee";

interface HierarchyTreeProps {
  employees: MarketingEmployee[];
}

export default function HierarchyTree({
  employees,
}: HierarchyTreeProps) {
  const managers = employees.filter(
    (e) => e.role === "Manager"
  );

  const agents = employees.filter(
    (e) => e.role === "Agent"
  );

  const subAgents = employees.filter(
    (e) => e.role === "Sub Agent"
  );

  return (
    <div className="space-y-8">
      {managers.map((manager) => (
        <HierarchyNode
          key={manager.id}
          employee={manager}
        >
          {agents
            .filter(
              (agent) => agent.manager_id === manager.id
            )
            .map((agent) => (
              <HierarchyNode
                key={agent.id}
                employee={agent}
              >
                {subAgents
                  .filter(
                    (sub) => sub.manager_id === agent.id
                  )
                  .map((sub) => (
                    <HierarchyNode
                      key={sub.id}
                      employee={sub}
                    />
                  ))}
              </HierarchyNode>
            ))}
        </HierarchyNode>
      ))}
    </div>
  );
}