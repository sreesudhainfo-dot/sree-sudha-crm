import { useEffect } from "react";
import type { MarketingEmployee } from "../types/MarketingEmployee";
import MarketingEmployeeForm from "./MarketingEmployeeForm";

interface Props {
  open: boolean;
  employee: MarketingEmployee | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function MarketingEmployeeModal({
  open,
  employee,
  onClose,
  onSuccess,
}: Props) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-bold">
            {employee ? "Edit Employee" : "Add Employee"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-slate-500 hover:text-red-600"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <MarketingEmployeeForm
            employee={employee}
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}