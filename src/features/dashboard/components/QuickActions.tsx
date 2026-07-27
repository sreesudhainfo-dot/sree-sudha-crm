import { useNavigate } from "react-router-dom";

import {
  FaUserPlus,
  FaUserFriends,
  FaClipboardList,
  FaMapMarkedAlt,
  FaImages,
  FaChartBar,
} from "react-icons/fa";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Employee",
      icon: <FaUserPlus size={22} />,
      path: "/employees/new",
      color: "bg-blue-600",
    },
    {
      title: "Add Customer",
      icon: <FaUserFriends size={22} />,
      path: "/customers",
      color: "bg-green-600",
    },
    {
      title: "Add Lead",
      icon: <FaClipboardList size={22} />,
      path: "/leads",
      color: "bg-purple-600",
    },
    {
      title: "Site Visit",
      icon: <FaMapMarkedAlt size={22} />,
      path: "/site-visits",
      color: "bg-orange-500",
    },
    {
      title: "Media Library",
      icon: <FaImages size={22} />,
      path: "/media-library",
      color: "bg-pink-600",
    },
    {
      title: "Reports",
      icon: <FaChartBar size={22} />,
      path: "/reports",
      color: "bg-slate-700",
    },
  ];

  return (
    <div className="space-y-5">

      <div>

        <h2 className="text-2xl font-bold">
          Quick Actions
        </h2>

        <p className="text-slate-500">
          Frequently used shortcuts
        </p>

      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">

        {actions.map((action) => (

          <button
            key={action.title}
            onClick={() => navigate(action.path)}
            className="rounded-2xl bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            <div
              className={`inline-flex rounded-xl ${action.color} p-4 text-white`}
            >
              {action.icon}
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              {action.title}
            </h3>

          </button>

        ))}

      </div>

    </div>
  );
}