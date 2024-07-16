import * as React from "react";

interface BackButtonProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BackButton({ setShowForm }: BackButtonProps) {
  return (
    <button
      className="btn btn-warning col-12"
      onClick={() => setShowForm(false)}
    >
      Back button
    </button>
  );
}
