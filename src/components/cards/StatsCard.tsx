import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  value: string;
  color: string;
  path?: string;
}

export default function StatsCard({
  title,
  value,
  color,
  path,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => path && navigate(path)}
      className={`rounded-xl border bg-white p-6 shadow-sm transition-all duration-200 ${
        path
          ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg"
          : ""
      }`}
    >
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2
        className={`mt-3 text-3xl font-bold ${color}`}
      >
        {value}
      </h2>
    </div>
  );
}