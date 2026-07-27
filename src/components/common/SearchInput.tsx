import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
        />
      </svg>
    </div>
  );
}