import * as React from "react";

interface UpdateButtonProps {
  name: string;
  data: number;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function UpdateButton({
  name,
  data,
  setShowForm,
  setId,
}: UpdateButtonProps) {
  return (
    <button
      className="btn btn-primary me-2"
      onClick={() => {
        setShowForm(true);
        setId(data);
      }}
    >
      {name}
    </button>
  );
}
