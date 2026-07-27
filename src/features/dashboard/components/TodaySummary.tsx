import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaUsers,
  FaMapMarkedAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

import { getAttendanceSummary } from "../../attendence/services/attendence";

export default function TodaySummary() {
  const [summary, setSummary] = useState({
    present: 0,
    leave: 0,
    halfDay: 0,
  });

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
  try {
    const data = await getAttendanceSummary();

    console.log("Attendance Summary:", data);

    setSummary({
      present: 999,
      leave: 0,
      halfDay: 0,
    });

  } catch (err) {
    console.error(err);
  }
}

  const cards = [
    {
      title: "Today's Attendance",
      value: summary.present,
      icon: <FaUsers />,
      color: "text-green-600",
    },
    {
      title: "Today's Leads",
      value: 0,
      icon: <FaPhoneAlt />,
      color: "text-purple-600",
    },
    {
      title: "Site Visits",
      value: 0,
      icon: <FaMapMarkedAlt />,
      color: "text-orange-500",
    },
    {
      title: "Revenue",
      value: "₹0",
      icon: <FaMoneyBillWave />,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Today's Summary
        </h2>

        <p className="text-slate-500">
          Live operational overview
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border p-5 transition hover:shadow-md"
          >
            <div className={`text-3xl ${item.color}`}>
              {item.icon}
            </div>

            <h3 className="mt-4 text-sm text-gray-500">
              {item.title}
            </h3>

            <p className="mt-2 text-3xl font-bold">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}