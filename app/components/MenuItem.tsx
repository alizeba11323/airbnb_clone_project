import React from "react";
interface MenuItsmProps {
  label: string;
  onClick: () => void;
}
function MenuItem({ label, onClick }: MenuItsmProps) {
  return (
    <div
      className="px-4 py-3 transition font-semibold bg-neutral-100 hover:bg-neutral-200 hover:text-slate-500"
      onClick={onClick}
    >
      {label}
    </div>
  );
}

export default MenuItem;
