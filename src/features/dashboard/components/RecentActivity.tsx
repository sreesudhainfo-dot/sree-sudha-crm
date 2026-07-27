import {
  FaUserPlus,
  FaUserCheck,
  FaPhoneAlt,
  FaMapMarkedAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaUserPlus className="text-blue-600" />,
    title: "New Employee Added",
    description: "Ravi Kumar joined Marketing Department",
    time: "10 mins ago",
  },
  {
    icon: <FaPhoneAlt className="text-purple-600" />,
    title: "New Lead Assigned",
    description: "Lead assigned to Telecaller Team",
    time: "25 mins ago",
  },
  {
    icon: <FaMapMarkedAlt className="text-orange-500" />,
    title: "Site Visit Scheduled",
    description: "Customer visit planned for tomorrow",
    time: "45 mins ago",
  },
  {
    icon: <FaMoneyBillWave className="text-green-600" />,
    title: "Booking Confirmed",
    description: "Plot A-23 booked successfully",
    time: "1 hour ago",
  },
  {
    icon: <FaUserCheck className="text-pink-600" />,
    title: "Customer Registered",
    description: "New customer added to CRM",
    time: "2 hours ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Recent Activity
        </h2>

        <p className="text-slate-500">
          Latest updates across the organization
        </p>

      </div>

      <div className="space-y-5">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="flex items-start gap-4 border-b pb-4 last:border-none"
          >

            <div className="rounded-xl bg-slate-100 p-3">
              {activity.icon}
            </div>

            <div className="flex-1">

              <h3 className="font-semibold">
                {activity.title}
              </h3>

              <p className="text-sm text-slate-500">
                {activity.description}
              </p>

            </div>

            <span className="text-xs text-slate-400">
              {activity.time}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}