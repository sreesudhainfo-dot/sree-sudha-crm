import { Link } from "react-router-dom";

interface Props {
  title: string;
  icon?: any;
  path?: string;
}

export default function SidebarItem({
  title,
  icon: Icon,
  path = "#",
}: Props) {
  return (
    <Link
      to={path}
      className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100"
    >
      {Icon && <Icon className="text-lg" />}
      <span>{title}</span>
    </Link>
  );
}