import { useEffect, useState } from "react";
import { getMarketingHierarchy } from "../services/marketing";
import HierarchyTree from "../components/HierarchyTree";
import type { MarketingEmployee } from "../types/MarketingEmployee";

export default function HierarchyPage() {
  const [employees, setEmployees] = useState<MarketingEmployee[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getMarketingHierarchy();
    setEmployees(data);
  }

//   const managers = employees.filter(
//     (e) => e.role === "Manager"
//   );

//   const agents = employees.filter(
//     (e) => e.role === "Agent"
//   );

//   const subAgents = employees.filter(
//     (e) => e.role === "Sub Agent"
//   );

  return (
    // <div className="space-y-6">
    //   <h1 className="text-3xl font-bold">
    //     Marketing Hierarchy
    //   </h1>

    //   <div className="rounded-xl bg-white p-6 shadow">
    //     {managers.map((manager) => (
    //       <div key={manager.id} className="mb-8">
    //         <div className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white">
    //           👨‍💼 {manager.full_name}
    //         </div>

    //         <div className="ml-8 mt-4 space-y-4">
    //           {agents
    //             .filter(
    //               (agent) => agent.manager_id === manager.id
    //             )
    //             .map((agent) => (
    //               <div key={agent.id}>
    //                 <div className="rounded-lg bg-green-100 px-4 py-2 font-medium">
    //                   👨 {agent.full_name}
    //                 </div>

    //                 <div className="ml-8 mt-3 space-y-2">
    //                   {subAgents
    //                     .filter(
    //                       (sub) =>
    //                         sub.manager_id === agent.id
    //                     )
    //                     .map((sub) => (
    //                       <div
    //                         key={sub.id}
    //                         className="rounded-lg bg-slate-100 px-4 py-2"
    //                       >
    //                         👤 {sub.full_name}
    //                       </div>
    //                     ))}
    //                 </div>
    //               </div>
    //             ))}
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="space-y-6">
    <h1 className="text-3xl font-bold">
      Marketing Hierarchy
    </h1>

    <HierarchyTree employees={employees} />
  </div>
  );
}