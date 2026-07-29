import { FaBell, FaSearch } from "react-icons/fa";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function Header({
  search,
  setSearch,
}: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">

      <h2 className="text-xl font-semibold text-slate-800">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">

        <div className="flex items-center rounded-lg border px-3 py-2">

          <FaSearch className="mr-2 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-64 outline-none"
          />

        </div>

        <button className="relative">
          <FaBell size={18} />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            A
          </div>

          <div>
            <p className="font-semibold">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}