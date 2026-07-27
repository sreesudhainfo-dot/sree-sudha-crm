import { useEffect, useRef, useState } from "react";

export interface SearchSelectOption {
  id: string;
  label: string;
  subLabel?: string;
}

interface SearchSelectProps {
  label?: string;
  placeholder?: string;
  options: SearchSelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function SearchSelect({
  label,
  placeholder = "Search...",
  options,
  value,
  onChange,
}: SearchSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selected = options.find((o) => o.id === value);

    if (selected) {
      setQuery(selected.label);
    }
  }, [value, options]);

  useEffect(() => {
    const handleClick = (event: globalThis.MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = options.filter((option) => {
    const q = query.toLowerCase();

    return (
      option.label.toLowerCase().includes(q) ||
      option.subLabel?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="mb-1 block text-sm font-medium">
          {label}
        </label>
      )}

      <input
        value={query}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        className="w-full rounded-lg border px-3 py-2"
      />

      {open && (
        <div className="absolute z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
          {filtered.length === 0 && (
            <div className="p-3 text-gray-500">
              No results found
            </div>
          )}

          {filtered.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                onChange(item.id);
                setQuery(item.label);
                setOpen(false);
              }}
              className="block w-full border-b px-3 py-2 text-left hover:bg-blue-50"
            >
              <div className="font-medium">
                {item.label}
              </div>

              {item.subLabel && (
                <div className="text-xs text-gray-500">
                  {item.subLabel}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}