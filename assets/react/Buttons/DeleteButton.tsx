import * as React from "react";

interface DeleteButtonProps {
  name: string;
  handleDelete: (id: number) => void;
  data: number;
}

export function DeleteButton({ name, handleDelete, data }: DeleteButtonProps) {
  return (
    <button onClick={() => handleDelete(data)} className={"btn btn-danger"}>
      {name}
    </button>
  );
}
