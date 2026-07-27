interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <input
        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        placeholder="Search by file name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}