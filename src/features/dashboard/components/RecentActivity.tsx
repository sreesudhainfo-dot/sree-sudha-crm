import {
  FaUserPlus,
  FaUserCheck,
  FaPhoneAlt,
  FaMapMarkedAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

import {
  useEffect,
  useState,
} from "react";

import { getRecentActivities } from "../services/recentActivity";
import { timeAgo } from "../utils/timeAgo";

export default function RecentActivity() {
  const [activities, setActivities] =
    useState<any[]>([]);

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {
    try {
      const data =
        await getRecentActivities();
      setActivities(data);
    } catch (err) {
      console.error(err);
    }
  }

  function getIcon(type: string) {
    switch (type) {
      case "employee":
        return (
          <FaUserPlus className="text-blue-600" />
        );

      case "lead":
        return (
          <FaPhoneAlt className="text-purple-600" />
        );

      case "visit":
        return (
          <FaMapMarkedAlt className="text-orange-500" />
        );

      case "booking":
        return (
          <FaMoneyBillWave className="text-green-600" />
        );

      case "customer":
        return (
          <FaUserCheck className="text-pink-600" />
        );

      default:
        return (
          <FaUserCheck className="text-gray-500" />
        );
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Recent Activity
        </h2>

        <p className="text-slate-500">
          Last 7 days activity
        </p>
      </div>

      <div className="space-y-5">

        {activities.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            No recent activity
          </div>
        ) : (
          activities.map(
            (
              activity,
              index
            ) => (
              <div
                key={index}
                className="flex items-start gap-4 border-b pb-4 last:border-none"
              >
                <div className="rounded-xl bg-slate-100 p-3">
                  {getIcon(
                    activity.type
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {activity.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {
                      activity.description
                    }
                  </p>
                </div>

                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {timeAgo(
                    activity.date
                  )}
                </span>
              </div>
            )
          )
        )}

      </div>
    </div>
  );
}