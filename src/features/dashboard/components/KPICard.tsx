import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  title: string;
  value: number;
  subtitle: string;
  icon: ReactNode;
  color: string;
  path: string;
}

export default function KPICard({
  title,
  value,
  subtitle,
  icon,
  color,
  path,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className={`${color} flex items-center justify-between p-5 text-white`}>
        <div>
          <p className="text-sm opacity-90">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-white/20 p-4">
          {icon}
        </div>
      </div>

      <div className="flex items-center justify-between p-5">

        <div>

          <p className="text-sm text-slate-500">
            {subtitle}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Click to View
          </p>

        </div>

        <FaArrowRight
          className="text-slate-400 transition-all duration-300 group-hover:translate-x-1"
          size={18}
        />

      </div>
    </div>
  );
}