import * as React from "react";

interface SortButtonProps {
  name: string;
  handleSort: (key: string) => void;
  data: string;
}

export function SortButton({ name, handleSort, data }: SortButtonProps) {
  return (
    <button className="btn btn-link" onClick={() => handleSort(data)}>
      {name}
    </button>
  );
}
