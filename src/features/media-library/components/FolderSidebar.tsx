const folders = [
  "All",
  "Marketing",
  "Brochures",
  "Layouts",
  "Legal",
  "Videos",
  "Logos",
  "Documents",
  "Other",
];

interface FolderSidebarProps {
  selected: string;
  onSelect: (folder: string) => void;
}

export default function FolderSidebar({
  selected,
  onSelect,
}: FolderSidebarProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-4 font-semibold">
        Folders
      </h2>

      <div className="space-y-2">
        {folders.map((folder) => (
          <button
            key={folder}
            onClick={() => onSelect(folder)}
            className={`w-full rounded-lg px-3 py-2 text-left transition ${
              selected === folder
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            {folder}
          </button>
        ))}
      </div>
    </div>
  );
}