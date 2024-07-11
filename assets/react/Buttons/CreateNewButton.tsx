import * as React from "react";

interface CreateNewButtonProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateNewButton({ setShowForm }: CreateNewButtonProps) {
  return (
    <button className="btn btn-primary mt-3" onClick={() => setShowForm(true)}>
      Create new project
    </button>
  );
}
