import * as React from "react";

interface UpdateButtonProps {
  name: string;
  data: number;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function UpdateButton({
  name,
  data,
  setShowForm,
  setProjectId,
}: UpdateButtonProps) {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        setShowForm(true);
        setProjectId(data);
      }}
    >
      {name}
    </button>
  );
}
