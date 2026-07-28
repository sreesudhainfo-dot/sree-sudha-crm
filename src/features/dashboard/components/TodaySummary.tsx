import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaUsers,
  FaMapMarkedAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

import { getDashboardSummary } from "../../../services/dashboard";

interface DashboardSummary {
  attendance: number;
  leads: number;
  visits: number;
  bookings: number;
}

export default function TodaySummary() {
  const [summary, setSummary] =
    useState<DashboardSummary>({
      attendance: 0,
      leads: 0,
      visits: 0,
      bookings: 0,
    });

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (err) {
      console.error(err);
    }
  }

  const cards = [
    {
      title: "Today's Attendance",
      value: summary.attendance,
      icon: <FaUsers />,
      color: "text-green-600",
    },
    {
      title: "Today's Leads",
      value: summary.leads,
      icon: <FaPhoneAlt />,
      color: "text-purple-600",
    },
    {
      title: "Today's Site Visits",
      value: summary.visits,
      icon: <FaMapMarkedAlt />,
      color: "text-orange-500",
    },
    {
      title: "Today's Bookings",
      value: summary.bookings,
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

        {cards.map((card) => (

          <div
            key={card.title}
            className="rounded-xl border p-5 transition hover:shadow-md"
          >

            <div className={`text-3xl ${card.color}`}>
              {card.icon}
            </div>

            <h3 className="mt-4 text-sm text-slate-500">
              {card.title}
            </h3>

            <p className="mt-2 text-3xl font-bold">
              {card.value}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}