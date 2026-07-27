import React from "react";

interface FilterSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  className?: string;
}

export default function FilterSelect({
  value,
  onChange,
  options,
  className = "",
}: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${className}`}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}